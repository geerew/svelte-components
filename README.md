# Svelty

This is a monorepo (multiple packages/workspaces) for Svelte

The packages are

- @svelty/headless
- @svelty/components
- docs

## Package Manager

[pnpm](https://pnpm.io/) is used throughout this repo

### Workspaces

The `pnpm-workspace.yaml` file at the root of the project, tells pnpm where the available packages are located

For more information on `workspace` see the pnpm [docs](https://pnpm.io/workspaces)

pnpm workspaces, among other things, ease local development by allowing packages to have 'local' dependencies

For example, `@svelty/components` has a dependency on `@svelty/headless`. A local dependency can be added with

```shell
pnpm add @svelty/headless --filter @svelty/components --workspace
```

This will add the following to the @svelty/components `package.json`

```json
"dependencies": {
	"@svelty/headless": "workspace:^0.0.1"
    ...
},
```

When @svelty/components is published (via pnpm), the keyword `workspace:` will be removed

### Commands

pnpm commands can be run from the root of the project, with filtering, to target specific workspaces

**Example commands**

Add a dev package to @svelty/components

```shell
pnpm add -D --filter @svelty/components [package]
```

Start the `docs` in dev mode

```shell
pnpm run --filter docs dev
```

## Sorting packages.json

To sort all the packages (keep tidy), run

```
pnpm exec sort-package-json "package.json" "packages/*/package.json"
```

## Author

- Michael Bell
