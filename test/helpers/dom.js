/* eslint-disable import/prefer-default-export */
import jsdom from 'jsdom'

export function prepareDocument(content = '') {
  global.window = jsdom.jsdom(content).defaultView
  global.document = global.window.document
}
