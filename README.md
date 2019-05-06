# starterkit

## What is this not?

- A boilerplate for creating games
- Sponsored ad for Typescript

## What is it then?

Starterkit is a `batteries included` base for creating awesome software using best practices within Netent.
It aims to not only provide great samples, but also an amazing **workflow**.

Starterkit is emphasizing on the boring stuff:

- Readability
- Scalability
- Discoverability
- Configurability
- Fixability (no black magic)
- Plug'n'play'ability (is that a word?)

There's also:

- Fast build times
- Optimized compiled code (loop optimizers etc)
- Friendly error messages when shit goes wrong.
- Preconfigured `Visual Studio Code` settings
  - Autofix on save
- Wallaby.js for realtime unit testing
- A bunch of dotfiles for versioning your teams configuration.

## Why have you created this? What's the philosophy behind it?

- GDP does not support libraries. Only building games
- Reduce build times from 10-20 minutes to ~ 60 seconds.
- Production grade preconfiguration
- Add many minimal examples solving real world problems
- Separate components from start & promote reusable code
- Stop copy/pasting entire games.
- Use as a playground for learning new technologies

## How are you developing this?

It is developed as a monorepo with:

- One base configuration
- Many small examples

It currently adds support for

- Babel to transform TypeScript to plain JavaScript
- TypeScript for type-checking.
- CI setup
- Linting
- Git hooks
- Unit tests
- Different techniques for E2E testing
- Support for releasing npm packages
- Sane defaults

## Okey, that sounds cool. Why should **I** use it though?

- To enable faster startup time when building software.
- It enables us to use real web standards, not "old legacy Netent standards".
- Use it as a springboard for creating prototypes, libraries, tools or games.

## How do I use it?

Glad you asked.

1.  Fork the repository
2.  Read package.json
3.  Look through the `examples` folder3.
4.  Delete the examples you don't need.
5.  Modify => commit => push.
6.  Profit!

## That sounds too simple.

Probably.

## I can do the same thing with 5 lines of vanilla \<insert programming language> of code

This repository is all about solving problems with Quality and scale it up when needed.

- Are your 5 lines of code testable?
- Can it build on Jenkins?
- Can you create npm packages from your code?
- Does it work on Windows/OSX/Linux (Ubuntu/Centos)?

## Get started

```sh
$ yarn install
$ cd examples/example-babylon1
$ yarn start

Open in browser: http://localhost:1234
```

## Building the repo(s)

```sh
yarn build
```

## Linting, Type-checking & formatting

This is also run automatically when commiting code.

```sh
yarn fix
```

## Howto update packages?

```sh
yarn upgrade-interactive --latest
```
