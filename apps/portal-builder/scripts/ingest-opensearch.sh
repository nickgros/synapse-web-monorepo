#!/bin/bash
# Script to set up OpenSearch index and ingest NDJSON data

OPENSEARCH_URL="http://localhost:9200"
INDEX_NAME="portal-docs"
NDJSON_FILE="${1:-output-index.ndjson}"

echo "Waiting for OpenSearch to be ready..."
until curl -s "$OPENSEARCH_URL" > /dev/null 2>&1; do
    sleep 2
done
echo "OpenSearch is ready!"

# Delete index if it exists
echo "Deleting existing index (if any)..."
curl -s -X DELETE "$OPENSEARCH_URL/$INDEX_NAME" > /dev/null 2>&1

# Create index with mapping
echo "Creating index with mapping..."
curl -s -X PUT "$OPENSEARCH_URL/$INDEX_NAME" -H 'Content-Type: application/json' -d '
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "resourceId": { "type": "keyword" },
      "resourceName": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
      "detailPageUrl": { "type": "keyword" },
      "columns": { "type": "object", "enabled": true },
      "markdownContent": { "type": "text" },
      "relatedResources": { "type": "object", "enabled": true }
    }
  }
}
' | jq .

# Ingest data in batches (OpenSearch has ~100MB limit per request)
echo "Ingesting data from $NDJSON_FILE..."
if [ -f "$NDJSON_FILE" ]; then
    TOTAL_LINES=$(wc -l < "$NDJSON_FILE")
    TOTAL_DOCS=$((TOTAL_LINES / 2))
    echo "Total documents to ingest: $TOTAL_DOCS"
    
    # Split file into chunks of 10000 lines (5000 docs) using split command
    TEMP_DIR=$(mktemp -d)
    split -l 10000 "$NDJSON_FILE" "$TEMP_DIR/batch_"
    
    BATCH_NUM=0
    for batch_file in "$TEMP_DIR"/batch_*; do
        BATCH_NUM=$((BATCH_NUM + 1))
        LINES_IN_BATCH=$(wc -l < "$batch_file")
        DOCS_IN_BATCH=$((LINES_IN_BATCH / 2))
        echo "  Ingesting batch $BATCH_NUM ($DOCS_IN_BATCH docs)..."
        RESULT=$(curl -s -X POST "$OPENSEARCH_URL/$INDEX_NAME/_bulk" \
            -H 'Content-Type: application/x-ndjson' \
            --data-binary "@$batch_file")
        ERRORS=$(echo "$RESULT" | jq -r '.errors')
        if [ "$ERRORS" = "true" ]; then
            ERROR_COUNT=$(echo "$RESULT" | jq '[.items[] | select(.index.error != null)] | length')
            echo "    Warning: $ERROR_COUNT errors in batch $BATCH_NUM"
        fi
    done
    
    rm -rf "$TEMP_DIR"
    
    # Refresh index
    curl -s -X POST "$OPENSEARCH_URL/$INDEX_NAME/_refresh" > /dev/null
    
    # Show count
    echo "Documents indexed:"
    curl -s "$OPENSEARCH_URL/$INDEX_NAME/_count" | jq .
else
    echo "Warning: $NDJSON_FILE not found. Skipping ingestion."
    echo "Run this script with the path to your NDJSON file: ./scripts/ingest-opensearch.sh path/to/file.ndjson"
fi

echo ""
echo "Done! You can now:"
echo "  - Query via curl: curl 'localhost:9200/$INDEX_NAME/_search?q=your+search+term'"
echo "  - Use OpenSearch Dashboards: http://localhost:5601 (Dev Tools)"
