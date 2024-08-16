import { atom } from 'jotai/index'
import { LockedColumn } from '../../utils'

/**
 * A column name may be "locked" so that it is both (1) not shown to the user that the filter is active, and (2) not modifiable by the user.
 * For example, we may show only the data matching a particular facet value on a Details Page without implying that the shown data is part of a larger table.
 * The presence of a locked filter will result in a client-side modification of the active query and result bundle data.
 */
export const lockedColumnAtom = atom<LockedColumn | undefined>(undefined)
/**
 * PORTALS-3071: For Tables that are not entityviews or a datasets, keep track of the column that should be used for the row entity ID
 */
export const fileIdColumnNameAtom = atom<string | undefined>(undefined)
/**
 * PORTALS-3071: For Tables that are not entityviews or a datasets, keep track of the column that should be used for the row (entity) version
 */
export const fileVersionColumnNameAtom = atom<string | undefined>(undefined)
/**
 * PORTALS-3071: For Tables that are not entityviews or a datasets, keep track of the column that should be used for the row (entity) name
 */
export const fileNameColumnNameAtom = atom<string | undefined>(undefined)
