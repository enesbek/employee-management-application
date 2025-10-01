/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';
import {playwrightLauncher} from '@web/test-runner-playwright';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const browsers = {
  // Local browser testing via playwright
  // ===========
  chromium: playwrightLauncher({product: 'chromium'}),
  firefox: playwrightLauncher({product: 'firefox'}),
  webkit: playwrightLauncher({product: 'webkit'}),
};

const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};
let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map(
    (b) => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

export default {
  rootDir: '.',
  files: ['src/**/*.test.js'],
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
    include: ['src/**/*.js'],
    exclude: ['src/**/*.test.js', 'src/**/*.styles.js', 'src/**/styles.js'],
  },
  preserveSymlinks: true,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '60000',
    },
  },
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || window.ShadyDOM && window.ShadyDOM.force",
            module: false,
          },
        ],
      },
    }),
  ],
};
