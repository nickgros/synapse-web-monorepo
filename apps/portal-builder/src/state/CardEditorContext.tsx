/**
 * Resource Editor Context
 *
 * This context tracks which resource is currently being actively edited.
 * When a resource is active, the preview panel switches from showing the
 * full portal preview to showing just the cards for that resource.
 *
 * This enables a focused editing experience where users can:
 * 1. Click "Preview" on a resource in the Resources tab
 * 2. See live card previews update as they edit field mappings
 * 3. Click "Back to Portal" to return to the full portal preview
 *
 * The context is separate from PortalConfigContext to keep concerns separated:
 * - PortalConfigContext: The actual configuration data
 * - ResourceEditorContext: UI state for which resource is being edited
 */
import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { Resource } from '../types'

interface ResourceEditorContextType {
  /** The resource currently being edited/previewed, or null if in portal view */
  activeResource: Resource | null
  /** Set the active resource for editing/previewing */
  setActiveResource: (resource: Resource | null) => void
  /** Whether we're in resource editing mode */
  isEditingResource: boolean
  /** The preview path to display in the preview panel (e.g., for detail pages) */
  previewPath: string | null
  /** Set a preview path to navigate the preview panel */
  setPreviewPath: (path: string | null) => void
}

const ResourceEditorContext = createContext<ResourceEditorContextType | null>(
  null,
)

export function ResourceEditorProvider({ children }: { children: ReactNode }) {
  const [activeResource, setActiveResourceInternal] = useState<Resource | null>(
    null,
  )
  const [previewPath, setPreviewPathInternal] = useState<string | null>(null)

  // When setting active resource, clear preview path (they're mutually exclusive)
  const setActiveResource = (resource: Resource | null) => {
    setActiveResourceInternal(resource)
    if (resource !== null) {
      setPreviewPathInternal(null)
    }
  }

  // When setting preview path, clear active resource (they're mutually exclusive)
  const setPreviewPath = (path: string | null) => {
    setPreviewPathInternal(path)
    if (path !== null) {
      setActiveResourceInternal(null)
    }
  }

  const value = useMemo(
    () => ({
      activeResource,
      setActiveResource,
      isEditingResource: activeResource !== null,
      previewPath,
      setPreviewPath,
    }),
    [activeResource, previewPath],
  )

  return (
    <ResourceEditorContext.Provider value={value}>
      {children}
    </ResourceEditorContext.Provider>
  )
}

// Default no-op context for when used outside provider (e.g., during HMR)
const defaultContext: ResourceEditorContextType = {
  activeResource: null,
  setActiveResource: () => {
    console.warn('setActiveResource called outside ResourceEditorProvider')
  },
  isEditingResource: false,
  previewPath: null,
  setPreviewPath: () => {
    console.warn('setPreviewPath called outside ResourceEditorProvider')
  },
}

export function useResourceEditor(): ResourceEditorContextType {
  const context = useContext(ResourceEditorContext)
  if (!context) {
    // Return default context instead of throwing
    // This can happen during HMR or if component is rendered outside provider
    console.warn(
      'useResourceEditor called outside ResourceEditorProvider, using default context',
    )
    return defaultContext
  }
  return context
}

// Backwards compatibility aliases
/** @deprecated Use ResourceEditorProvider instead */
export const CardEditorProvider = ResourceEditorProvider
/** @deprecated Use useResourceEditor instead */
export const useCardEditor = useResourceEditor
