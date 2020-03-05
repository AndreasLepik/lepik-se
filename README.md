# Website for lepik.se

[![Netlify Status](https://api.netlify.com/api/v1/badges/883be9d5-4310-42ff-9f4e-b478b4754efb/deploy-status)](https://app.netlify.com/sites/lepik/deploys)

A real fancy website for a 1995-kind-of-boy. Unlike Andreas, this website does
mostly nothing.

## Updating the live website

This repository is connected to [Netlify](https://www.netlify.com), which serves
the website that [lepik.se](https://lepik.se) is pointed to.

Netlify watches this repository, and every time a change is made to the `master`
branch, Netlify uploads the contents of [`src`](./src) to `lepik.se`.

TL;DR: Make changes or add new files to `src/`, and they will be uploaded to
lepik.se.

### More details

In reality, Netlify runs a build-script defined in
[`package.json`](`package.json`), which currently only copies the files from
`src` to a folder called `dist` (on purpose not included in git, see
[`.gitignore`](.gitignore)). Right now, this "build script" only copies the
files. Commonly, such a build-script would apply various transformations to the
files here, e.g. minification, concatenation, transpilation, etc.

## Development

The most straight-forward way is to simply open `src/index.html`, make changes,
and reload the browser.

A slightly more convenient way is to launch a development-server, which
automagically reloads the browser and/or injects changes for you. This requires
`npm`, which comes with [`node`](https://nodejs.org), to be on your path.

```bash
# Install the local development dependencies
npm install

# Run the development script, defined in package.json
npm start
```
