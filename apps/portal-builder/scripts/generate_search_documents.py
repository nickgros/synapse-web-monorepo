#!/usr/bin/env python3
"""
Search Document Generator for Portal Builder

This script generates OpenSearch-compatible documents for all resources in a portal configuration.
Each document contains all the data that would be displayed on a resource's detail page,
including:
- All columns from the resource's table
- Full markdown content from any markdown-from-column sections
- Key identifying fields from related resources

Output format: NDJSON (Newline Delimited JSON) for OpenSearch bulk ingestion

Usage:
    python generate_search_documents.py --config <path-to-portal-config.json> --output <output-file.ndjson>

Requirements:
    pip install synapseclient pandas
"""

import argparse
import json
import re
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import pandas as pd
import synapseclient
from synapseclient import Synapse
from synapseclient.models import query


@dataclass
class SearchDocument:
    """Represents a single search document for OpenSearch."""
    id: str  # Composite key: resourceId:primaryKeyValue
    resource_id: str
    resource_name: str
    detail_page_url: str | None
    columns: dict[str, Any]
    markdown_content: list[str]
    related_resources: dict[str, list[dict[str, Any]]]

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "resourceId": self.resource_id,
            "resourceName": self.resource_name,
            "detailPageUrl": self.detail_page_url,
            "columns": self.columns,
            "markdownContent": self.markdown_content,
            "relatedResources": self.related_resources,
        }


@dataclass
class ResourceData:
    """Cached data for a resource."""
    resource: dict[str, Any]
    dataframe: Any
    detail_route: dict[str, Any] | None = None
    detail_path: str | None = None


class SearchDocumentGenerator:
    """Generates search documents from portal configuration."""

    def __init__(self, portal_config: dict[str, Any], syn: Synapse):
        self.portal_config = portal_config
        self.syn = syn
        self.resource_map: dict[str, dict[str, Any]] = {
            r["id"]: r for r in portal_config.get("resources", [])
        }
        # Cache for loaded resource dataframes
        self.resource_data_cache: dict[str, ResourceData] = {}

    def extract_table_id(self, sql: str) -> str | None:
        """Extract the Synapse table ID from a SQL query."""
        match = re.search(r"FROM\s+(syn\d+(?:\.\d+)?)", sql, re.IGNORECASE)
        return match.group(1) if match else None

    def load_resource_dataframe(self, resource: dict[str, Any]) -> Any:
        """Load a resource's data as a pandas DataFrame."""
        resource_id = resource["id"]
        
        if resource_id in self.resource_data_cache:
            return self.resource_data_cache[resource_id].dataframe
        
        sql = resource["sql"]
        print(f"    Loading table data: {sql[:80]}...")
        
        start_time = time.time()
        try:
            df = query(sql)
            elapsed = time.time() - start_time
            print(f"    Loaded {len(df)} rows in {elapsed:.1f}s")
            
            # Find detail route for this resource
            detail_route, detail_path = self.find_detail_route(
                self.portal_config.get("routes", []), 
                resource_id
            )
            
            self.resource_data_cache[resource_id] = ResourceData(
                resource=resource,
                dataframe=df,
                detail_route=detail_route,
                detail_path=detail_path,
            )
            return df
        except Exception as e:
            print(f"    Error loading resource: {e}")
            return pd.DataFrame()

    def find_detail_route(
        self, 
        routes: list[dict], 
        resource_id: str, 
        parent_path: str = ""
    ) -> tuple[dict | None, str | None]:
        """Find the detail route for a resource."""
        for route in routes:
            current_path = f"{parent_path}/{route.get('path', '')}".replace("//", "/")
            
            if (route.get("displayAs") == "details" and 
                route.get("detailsConfig", {}).get("resourceId") == resource_id):
                return route, current_path
            
            if "children" in route:
                found_route, found_path = self.find_detail_route(
                    route["children"], resource_id, current_path
                )
                if found_route:
                    return found_route, found_path
        
        return None, None

    def get_detail_page_sections(self, details_config: dict) -> list[dict]:
        """Get all sections from a detail page config (handles tabs and direct sections)."""
        sections = []
        
        if "tabs" in details_config:
            for tab in details_config["tabs"]:
                sections.extend(tab.get("sections", []))
        
        sections.extend(details_config.get("sections", []))
        return sections

    def fetch_markdown_content(self, syn_id: str) -> str | None:
        """Fetch wiki/markdown content for an entity."""
        try:
            wiki = self.syn.getWiki(syn_id)
            return wiki.markdown if wiki else None
        except Exception:
            # Entity may not have a wiki page
            return None

    def extract_markdown_from_sections(
        self,
        sections: list[dict],
        row: pd.Series,
    ) -> list[str]:
        """Extract markdown content from sections that reference markdown columns."""
        markdown_content = []
        
        for section in sections:
            config = section.get("config", {})
            if config.get("type") == "markdown-from-column":
                column_name = config.get("columnName")
                if column_name and column_name in row.index:
                    value = row[column_name]
                    if pd.notna(value) and value:
                        if config.get("isRawMarkdown"):
                            # Column contains raw markdown text
                            markdown_content.append(str(value))
                        else:
                            # Column contains a Synapse ID - fetch wiki content
                            print(f"        Fetching wiki for {value}...")
                            content = self.fetch_markdown_content(str(value))
                            if content:
                                markdown_content.append(content)
        
        return markdown_content

    def fetch_related_resources(
        self,
        sections: list[dict],
        row: pd.Series,
    ) -> dict[str, list[dict[str, Any]]]:
        """Fetch related resource data for a row using cached dataframes."""
        related_resources: dict[str, list[dict]] = {}
        
        for section in sections:
            config = section.get("config", {})
            if config.get("type") != "related-resource":
                continue
            
            source_resource_id = config.get("sourceResourceId")
            source_resource = self.resource_map.get(source_resource_id)
            
            if not source_resource:
                print(f"        Warning: Related resource {source_resource_id} not found")
                continue
            
            # Get the value to filter by from the current row
            source_column_name = config.get("sourceColumnName")
            if source_column_name not in row.index:
                continue
                
            filter_value = row[source_column_name]
            if pd.isna(filter_value) or not filter_value:
                continue
            
            # Load the related resource's dataframe (will use cache if already loaded)
            related_df = self.load_resource_dataframe(source_resource)
            if related_df.empty:
                continue
            
            # Filter the dataframe locally
            filter_column_name = config.get("filterColumnName")
            if filter_column_name not in related_df.columns:
                print(f"        Warning: Column {filter_column_name} not found in {source_resource_id}")
                continue
            
            # Handle filtering - the filter column might contain comma-separated values
            filter_value_str = str(filter_value)
            
            # Simple equality filter
            filtered_df = related_df[
                related_df[filter_column_name].astype(str) == filter_value_str
            ]
            
            if len(filtered_df) == 0:
                # Try checking if filter_value is contained in the column (for list-like columns)
                filtered_df = related_df[
                    related_df[filter_column_name].astype(str).str.contains(
                        re.escape(filter_value_str), na=False
                    )
                ]
            
            if len(filtered_df) > 0:
                print(f"        Found {len(filtered_df)} related {source_resource['name']} items")
                
                # Convert to list of dicts
                related_data = []
                for _, related_row in filtered_df.head(100).iterrows():  # Limit to 100
                    related_data.append({
                        "resourceId": source_resource_id,
                        "resourceName": source_resource["name"],
                        "keyFields": related_row.to_dict(),
                    })
                
                key = section.get("title") or f"related_{source_resource_id}"
                related_resources[key] = related_data
        
        return related_resources

    def get_primary_key_value(
        self, 
        row: pd.Series, 
        primary_key_columns: list[str]
    ) -> str:
        """Get the primary key value for a row."""
        if not primary_key_columns:
            # Use index as fallback
            return str(row.name) if row.name is not None else ""
        
        values = []
        for col in primary_key_columns:
            if col in row.index:
                val = row[col]
                values.append(str(val) if pd.notna(val) else "")
            else:
                values.append("")
        
        return ":".join(values)

    def generate_documents_for_resource(
        self, 
        resource: dict[str, Any]
    ) -> list[SearchDocument]:
        """Generate search documents for a single resource."""
        documents = []
        resource_id = resource["id"]
        resource_name = resource["name"]
        primary_key_columns = resource.get("primaryKeyColumns", [])
        
        # Load dataframe
        df = self.load_resource_dataframe(resource)
        if df.empty:
            return documents
        
        # Get cached resource data for detail route info
        resource_data = self.resource_data_cache.get(resource_id)
        details_config = None
        sections = []
        
        if resource_data and resource_data.detail_route:
            details_config = resource_data.detail_route.get("detailsConfig", {})
            sections = self.get_detail_page_sections(details_config)
        
        print(f"  Processing {len(df)} rows...")
        if sections:
            markdown_sections = sum(1 for s in sections if s.get("config", {}).get("type") == "markdown-from-column")
            related_sections = sum(1 for s in sections if s.get("config", {}).get("type") == "related-resource")
            print(f"    Detail page has {markdown_sections} markdown sections, {related_sections} related resource sections")
        else:
            print(f"    No detail page sections configured")
        
        for i, (idx, row) in enumerate(df.iterrows()):
            primary_key_value = self.get_primary_key_value(row, primary_key_columns)
            
            # Build detail page URL if available
            detail_page_url = None
            if resource_data and resource_data.detail_path:
                detail_page_url = re.sub(
                    r"DetailsPage$",
                    primary_key_value,
                    resource_data.detail_path
                )
            
            # Extract column values (handle arrays and other complex types)
            columns = {}
            for k, v in row.to_dict().items():
                if v is None:
                    columns[k] = None
                elif isinstance(v, (list, tuple)):
                    # Keep arrays as-is
                    columns[k] = list(v) if len(v) > 0 else None
                elif hasattr(v, '__iter__') and not isinstance(v, str):
                    # Handle numpy arrays and other iterables
                    try:
                        columns[k] = list(v) if len(v) > 0 else None
                    except (TypeError, ValueError):
                        columns[k] = v
                elif pd.isna(v):
                    columns[k] = None
                else:
                    columns[k] = v
            
            # Extract markdown content
            markdown_content = self.extract_markdown_from_sections(sections, row)
            
            # Fetch related resources (uses cached dataframes)
            related_resources = self.fetch_related_resources(sections, row)
            
            document = SearchDocument(
                id=f"{resource_id}:{primary_key_value}",
                resource_id=resource_id,
                resource_name=resource_name,
                detail_page_url=detail_page_url,
                columns=columns,
                markdown_content=markdown_content,
                related_resources=related_resources,
            )
            documents.append(document)
            
            # Log progress
            if (i + 1) % 10 == 0 or i + 1 == len(df):
                print(f"    Processed {i + 1}/{len(df)} rows...")
        
        return documents

    def generate_all_documents(self) -> list[SearchDocument]:
        """Generate all search documents for the portal."""
        all_documents = []
        resources = self.portal_config.get("resources", [])
        
        print(f"Generating search documents for {len(resources)} resources...")
        
        # Pre-load all resource dataframes to populate cache
        print("\n=== Phase 1: Loading all resource tables ===")
        for i, resource in enumerate(resources):
            print(f"\n[{i + 1}/{len(resources)}] Loading: {resource['name']}")
            self.load_resource_dataframe(resource)
        
        print("\n=== Phase 2: Generating documents ===")
        for i, resource in enumerate(resources):
            print(f"\n[{i + 1}/{len(resources)}] Processing: {resource['name']}")
            start_time = time.time()
            
            try:
                documents = self.generate_documents_for_resource(resource)
                elapsed = time.time() - start_time
                print(f"  Completed in {elapsed:.1f}s - generated {len(documents)} documents")
                all_documents.extend(documents)
            except Exception as e:
                print(f"  Error processing resource {resource['id']}: {e}")
                import traceback
                traceback.print_exc()
        
        print(f"\nTotal documents generated: {len(all_documents)}")
        return all_documents

    def write_ndjson(self, documents: list[SearchDocument], output_path: str) -> None:
        """Write documents to NDJSON file for OpenSearch bulk ingestion."""
        with open(output_path, "w", encoding="utf-8") as f:
            for doc in documents:
                # OpenSearch bulk format: action line followed by document line
                action_line = json.dumps({"index": {"_id": doc.id}})
                doc_line = json.dumps(doc.to_dict(), default=str)
                f.write(action_line + "\n")
                f.write(doc_line + "\n")
        
        print(f"Written {len(documents)} documents to {output_path}")


def _get_logged_in_username(syn: Synapse) -> str | None:
    """Return the logged-in username.

    Prefer a username attribute on the client; otherwise call the legacy
    syn.getUserProfile() while suppressing DeprecationWarning.
    """
    try:
        username_attr = getattr(syn, "username", None)
        if username_attr:
            return username_attr

        # Final fallback: call deprecated method but suppress the DeprecationWarning
        import warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", DeprecationWarning)
            try:
                profile = syn.getUserProfile()
                return getattr(profile, "userName", None)
            except Exception:
                return None
    except Exception:
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Generate OpenSearch documents from portal configuration"
    )
    parser.add_argument(
        "--config", "-c",
        required=True,
        help="Path to portal config JSON file"
    )
    parser.add_argument(
        "--output", "-o",
        required=True,
        help="Path to output NDJSON file"
    )
    parser.add_argument(
        "--auth-token",
        help="Synapse auth token (or set SYNAPSE_AUTH_TOKEN env var)"
    )
    
    args = parser.parse_args()
    
    print("Configuration:")
    print(f"  Config file: {args.config}")
    print(f"  Output file: {args.output}")
    print()
    
    # Load portal config
    config_path = Path(args.config).expanduser()
    with open(config_path, "r", encoding="utf-8") as f:
        portal_config = json.load(f)
    
    portal_name = portal_config.get("metadata", {}).get("name", "Unnamed Portal")
    print(f"Loaded portal config: {portal_name}")
    print(f"  Resources: {len(portal_config.get('resources', []))}")
    print()
    
    # Initialize Synapse client
    print("Connecting to Synapse...")
    # Suppress the specific deprecation warning that originates from syn.getUserProfile
    # (which may be called internally by the Synapse client during initialization).
    import warnings
    warnings.filterwarnings("ignore", category=DeprecationWarning, message=".*getUserProfile.*")
    syn = synapseclient.Synapse()
    logged_in_user = _get_logged_in_username(syn)
    if logged_in_user:
        print(f"Logged in as: {logged_in_user}")
    else:
        print("Logged in as: <unknown>")
    print()

    # Generate documents
    generator = SearchDocumentGenerator(portal_config, syn)
    documents = generator.generate_all_documents()

    # Write output
    generator.write_ndjson(documents, args.output)
    
    print("\nDone!")


if __name__ == "__main__":
    main()
