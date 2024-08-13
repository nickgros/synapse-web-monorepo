import 'whatwg-fetch'
import 'raf/polyfill' // polyfill for requestAnimationFrame
import '@testing-library/jest-dom/vitest'
import crypto from 'crypto'
import { ResizeObserver } from '@juggle/resize-observer'
import { setupIntersectionMocking } from 'react-intersection-observer/test-utils'
import { faker } from '@faker-js/faker'
import { configure } from '@testing-library/dom'
import { vi } from 'vitest'

// Replace 'jest' global with 'vi'
// This allows us to use @googlemaps/jest-mocks. See https://github.com/googlemaps/js-jest-mocks/issues/294
vi.stubGlobal('jest', vi)

// Set a constant seed for faker so the generated data doesn't change
beforeAll(() => {
  faker.seed(12345)
})

// MarkdownSynapse dependencies below --
// When using the component in production it relies on these imports being globals,
// however, the testing environment doesn't have a browser loading CDNs, so we
// import it below. This also means that these dependencies are required in package.json
global.ResizeObserver = ResizeObserver

setupIntersectionMocking(vi.fn)

const oldWindowLocation = window.location
const oldWindowOpen = window.open

/**
 * Mock `window.location` so we can verify interactions in tests
 * See https://www.benmvp.com/blog/mocking-window-location-methods-jest-jsdom/
 */
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TS doesn't allow us to delete location. Not an issue because we're immediately replacing it with the mock
  delete window.location
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      // Each method must be manually mocked
      assign: {
        configurable: true,
        value: vi.fn(),
      },
      replace: {
        configurable: true,
        value: vi.fn(),
      },
    },
  ) as Location

  delete window.open
  window.open = vi.fn()
})
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldWindowLocation
  window.open = oldWindowOpen
})

// Bump `waitFor` timout from 1000ms to 5000ms in CI
configure({ asyncUtilTimeout: process.env.CI ? 5000 : 1000 })

// JSDOM doesn't support createObjectURL and revokeObjectURL, so we shim them
// https://github.com/jsdom/jsdom/issues/1721
window.URL.createObjectURL = vi
  .fn()
  .mockReturnValue('blob:mockBlobUrlConfiguredInTestSetup')
window.URL.revokeObjectURL = vi.fn()
window.scrollTo = vi.fn()

Element.prototype.scrollTo = vi.fn()

// crypto.getRandomValues polyfill for JSDOM
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length),
  },
})
