export enum FeatureFlagKey {
  _TEST_FLAG_ONLY = 'TEST_FLAG_ONLY',
  /**
   *  Used to show the EntityModal component when viewing annotations and the SchemaDrivenAnnotationEditor
   *  component when editing annotations
   */
  ANNOTATIONS_EDITOR_V2 = 'ANNOTATIONS_EDITOR_V2',
  /**
   * Used to show results from validating entities against their bound JSON Schemas
   */
  JSON_SCHEMA_VALIDATION = 'JSON_SCHEMA_VALIDATION',
}
