import { BrowserPolicy } from 'meteor/browser-policy-common';

export default function () {
  BrowserPolicy.framing.disallow();
  BrowserPolicy.content.disallowEval();
  BrowserPolicy.content.allowFontDataUrl();
  BrowserPolicy.content.allowSameOriginForAll();

  // commonly used services
  BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.filestackapi.com');
  BrowserPolicy.content.allowOriginForAll('*.filepicker.io');
  // Polyfill cdn
  BrowserPolicy.content.allowOriginForAll('cdn.polyfill.io');
}
