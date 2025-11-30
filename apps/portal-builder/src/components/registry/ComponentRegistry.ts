import { ComponentType } from 'react'
import { z } from 'zod'

/**
 * Represents a registered component in the portal builder
 */
export interface RegisteredComponent {
  /** Unique identifier for this component type */
  type: string
  /** Human-readable name */
  displayName: string
  /** Description of what this component does */
  description: string
  /** Category for grouping in the UI */
  category: ComponentCategory
  /** The actual React component (for eagerly loaded components) */
  component?: ComponentType<any>
  /**
   * Lazy loader for the component (for code-split components).
   * Returns a promise that resolves to the component.
   */
  lazyComponent?: () => Promise<{ default: ComponentType<any> }>
  /** Zod schema for validating props */
  propsSchema: z.ZodObject<any>
  /** Default props when adding this component */
  defaultProps: Record<string, unknown>
  /**
   * Whether this is a custom/portal-specific component.
   * Custom components are registered at runtime by individual portals.
   */
  isCustom?: boolean
}

export type ComponentCategory =
  | 'data-display'
  | 'layout'
  | 'content'
  | 'navigation'
  | 'user'
  | 'custom'

/**
 * Registry of all available components for the portal builder
 */
export const componentRegistry: Map<string, RegisteredComponent> = new Map()

/**
 * Register a component for use in the portal builder
 */
export function registerComponent(config: RegisteredComponent): void {
  if (!config.component && !config.lazyComponent) {
    throw new Error(
      `Component "${config.type}" must have either 'component' or 'lazyComponent'`,
    )
  }
  componentRegistry.set(config.type, config)
}

/**
 * Register a custom component with lazy loading.
 * This is the recommended way for portals to register their custom components.
 *
 * @example
 * ```ts
 * registerCustomComponent({
 *   type: 'ELGettingStarted',
 *   displayName: 'Getting Started',
 *   description: 'ELITE portal getting started section',
 *   lazyComponent: () => import('./components/ELGettingStarted'),
 * })
 * ```
 */
export function registerCustomComponent(config: {
  type: string
  displayName: string
  description: string
  lazyComponent: () => Promise<{ default: ComponentType<any> }>
  propsSchema?: z.ZodObject<any>
  defaultProps?: Record<string, unknown>
}): void {
  registerComponent({
    type: config.type,
    displayName: config.displayName,
    description: config.description,
    category: 'custom',
    lazyComponent: config.lazyComponent,
    propsSchema: config.propsSchema ?? z.object({}),
    defaultProps: config.defaultProps ?? {},
    isCustom: true,
  })
}

/**
 * Get a registered component by type
 */
export function getComponent(type: string): RegisteredComponent | undefined {
  return componentRegistry.get(type)
}

/**
 * Get the actual React component, loading it if necessary.
 * Returns a promise that resolves to the component.
 */
export async function loadComponent(
  type: string,
): Promise<ComponentType<any> | undefined> {
  const registered = componentRegistry.get(type)
  if (!registered) {
    return undefined
  }

  if (registered.component) {
    return registered.component
  }

  if (registered.lazyComponent) {
    const module = await registered.lazyComponent()
    // Cache the loaded component for future use
    registered.component = module.default
    return module.default
  }

  return undefined
}

/**
 * Get all registered components
 */
export function getAllComponents(): RegisteredComponent[] {
  return Array.from(componentRegistry.values())
}

/**
 * Get components by category
 */
export function getComponentsByCategory(
  category: ComponentCategory,
): RegisteredComponent[] {
  return getAllComponents().filter(c => c.category === category)
}

/**
 * Get all custom components
 */
export function getCustomComponents(): RegisteredComponent[] {
  return getAllComponents().filter(c => c.isCustom === true)
}
