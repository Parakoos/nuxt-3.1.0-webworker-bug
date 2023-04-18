# Issue with Nuxt 3.1.0 and Web Worker / Vuetify usage

This is a minimal reproduction of an issue concerning Nuxt v3.1.0 and
the usage of Web Workers and Vuetify.

This repo loads Vuetify, and has a single v-btn that will
load a Web Worker to do some calculations in a different thread,
and then post the result back to the main thread where it is displayed.

This works OK when using Nuxt 3.0.0. But if you upgrade to Nuxt 3.1.0
or higher, it breaks. The Vuetify styling disappears (the CSS is nowhere
to be seen) and the Web Worker script goes mental.

Note that the error only occurs when you build for production. The dev
server always works without a hitch.

## Reproduction

### Install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Test on v.3.0.0

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

You should now see a page with a single button, 'Call Worker'.
Press it and the button thinks for a bit while the worker thread
does the calculations, then reports back with a piece of text under the button.

You can also see log messages from the worker in the console.

### Test on v 3.1.0

Edit the ```package.json``` and change the "nuxt" dependency to "3.1.0", then install the new version.

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

You should now not see the button anymore.
Open the console and notice that the web worker is being called
with the value '0' over and over again.