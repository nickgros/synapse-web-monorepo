import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  createContext,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'
import { WindowOverrideContext } from 'synapse-react-client/utils/hooks/useShowDesktop'

/**
 * Context for providing the iframe's document to child components.
 * This is needed for MUI components that render portals (Menu, Popover, etc.)
 * to position correctly within the iframe.
 */
export const IframeDocumentContext = createContext<Document | null>(null)

export function useIframeDocument(): Document {
  const iframeDocument = useContext(IframeDocumentContext)
  return iframeDocument ?? document
}

interface IframePreviewProps {
  children: ReactNode
  width: string
  height: string
}

/**
 * Renders children inside an iframe to create a true separate viewport.
 * This ensures CSS media queries respond to the iframe's width, not the parent window.
 *
 * Provides the iframe's window via WindowOverrideContext so that hooks like
 * useShowDesktop will use the iframe's viewport dimensions for responsive behavior.
 */
export function IframePreview({ children, width, height }: IframePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountState, setMountState] = useState<{
    document: Document
    window: Window
  } | null>(null)

  const initializeIframe = () => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument
    const win = iframe.contentWindow
    if (!doc || !win) return

    // Copy all stylesheets from parent document to iframe
    const copyStyles = () => {
      // Clear existing styles
      const existingStyles = doc.head.querySelectorAll(
        'style, link[rel="stylesheet"]',
      )
      existingStyles.forEach(el => el.remove())

      // Copy link stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const clonedLink = link.cloneNode(true) as HTMLLinkElement
        doc.head.appendChild(clonedLink)
      })

      // Copy style elements
      document.querySelectorAll('style').forEach(style => {
        const clonedStyle = style.cloneNode(true) as HTMLStyleElement
        doc.head.appendChild(clonedStyle)
      })

      // Add base styles for the iframe body
      const baseStyle = doc.createElement('style')
      baseStyle.textContent = `
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: auto;
        }
        #preview-root {
          height: 100%;
        }
      `
      doc.head.appendChild(baseStyle)
    }

    // Create the root element for React portal
    if (!doc.getElementById('preview-root')) {
      const root = doc.createElement('div')
      root.id = 'preview-root'
      doc.body.appendChild(root)
    }

    copyStyles()
    setMountState({ document: doc, window: win })

    // Watch for style changes in parent document
    const observer = new MutationObserver(() => {
      copyStyles()
    })

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }

  // Initialize on mount and when the iframe loads
  useEffect(() => {
    const cleanup = initializeIframe()
    return cleanup
  }, [])

  const mountNode = mountState?.document.getElementById('preview-root')

  return (
    <iframe
      ref={iframeRef}
      onLoad={initializeIframe}
      style={{
        width,
        height,
        border: 'none',
        display: 'block',
      }}
      title="Portal Preview"
    >
      {mountNode &&
        createPortal(
          <IframeDocumentContext.Provider value={mountState?.document ?? null}>
            <WindowOverrideContext.Provider value={mountState?.window ?? null}>
              {children}
            </WindowOverrideContext.Provider>
          </IframeDocumentContext.Provider>,
          mountNode,
        )}
    </iframe>
  )
}
