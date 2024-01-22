import { ColumnModel } from '@sage-bionetworks/synapse-types'
import { z, ZodSchema } from 'zod'
import { columnModelZodSchema } from './ColumnModelValidator'

/**
 * For views, we can provide additional validation for annotation-based columns using the generated ColumnModels
 *
 * For example, if the user's annotation column has a smaller maxLength than the generated ColumnModel, we should warn
 * the user that their table will probably break at query-time.
 *
 * Returns a ZodSchema that can validate an individual ColumnModel.
 */
export function createSchemaWithAnnotationColumns(
  generatedAnnotationColumnModels: ColumnModel[],
): ZodSchema {
  return columnModelZodSchema.superRefine((cm, ctx) => {
    const matchingGeneratedModel = generatedAnnotationColumnModels.find(
      generatedModel =>
        generatedModel.name === cm.name &&
        generatedModel.columnType === cm.columnType,
    )
    // No matching annotation column model--no need to add any issues.
    // The user could have intentionally changed the columnType, so this doesn't necessarily mean that data will not be shown in this column
    if (!matchingGeneratedModel) {
      return
    }
    if (
      matchingGeneratedModel.maximumSize &&
      cm.maximumSize &&
      cm.maximumSize < matchingGeneratedModel.maximumSize
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: matchingGeneratedModel.maximumSize,
        type: 'number',
        path: ['maximumSize'],
        inclusive: true,
        message: `Annotations were found with sizes up to ${matchingGeneratedModel.maximumSize}.`,
      })
    }

    if (
      matchingGeneratedModel.maximumListLength &&
      cm.maximumListLength &&
      cm.maximumListLength < matchingGeneratedModel.maximumListLength
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: matchingGeneratedModel.maximumListLength,
        type: 'number',
        path: ['maximumListLength'],
        inclusive: true,
        message: `Annotations were found with list lengths up to ${matchingGeneratedModel.maximumListLength}.`,
      })
    }
  })
}
