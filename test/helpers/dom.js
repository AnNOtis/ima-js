/* eslint-disable import/prefer-default-export */
import jsdom from 'jsdom'

export function prepareDocument(content = '') {
  global.document = jsdom.jsdom(content).defaultView.document
}
