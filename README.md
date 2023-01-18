# G2 libraries

![](https://badgen.net/badge/React/16.13.1/purple)
![](https://badgen.net/badge/@material-ui/4.11.3/green)
![](https://badgen.net/npm/v/@smartb/g2-components/latest)
![](https://badgen.net/npm/types/tslib)

## 📦 Install

```bash
npm install @smartb/g2-components
npm install @smartb/g2-documentation
npm install @smartb/g2-layout
npm install @smartb/g2-notifications
npm install @smartb/g2-forms
npm install @smartb/g2-providers
npm install @smartb/g2-themes
npm install @smartb/g2-s2
```

```bash
yarn add @smartb/g2-components
yarn add @smartb/g2-documentation
yarn add @smartb/g2-layout
yarn add @smartb/g2-notifications
yarn add @smartb/g2-forms
yarn add @smartb/g2-themes
yarn add @smartb/g2-providers
yarn add @smartb/g2-s2
```

## 📁 The ready-to-go empty application based on our ecosystem with g2 integrated

[get the zip here !](app-full.zip) (open it in a new window)

## 🧰 The contents

Almost every components are based on [Material-ui](https://material-ui.com/).

- @smartb/g2-components regroups basic components to build an application like button, card, panel etc...

- @smartb/g2-documentation regroups the components to document code.

- @smartb/g2-forms regroups the components to build a complete form like text-fields, select etc...

- @smartb/g2-layout regroups complexe layouts to structure an application like nav-bar, steppers, tools-menu etc...

- @smartb/g2-notifications regroups the components to notify the user of an application.

- @smartb/g2-providers regroups provider to make a standard modern react app like i18n, redux etc...

- @smartb/g2-themes regroups providers and hooks to use our theme and the material-ui theme in the application.

- @smartb/g2-s2 regroups components to work with Smartb's tools.

## 🌈 Override styles

There is a `theme provider` component in @smartb/g2-components that has to include the app.

You have to give it a theme ~~that you can get and customise [here](/?path=/story/overview-cheatsheet-theme--page)~~ (not yet available). And you can also give it a [material-ui theme](https://material-ui.com/customization/default-theme/) to override the material-ui default properties.

Every components and layouts will have the following props to easily override their default styles:

- `className` to give a class to the root of the component.
- `style` to give custom styles to the root of the component.
- `classes` An object regrouping all the classes you can give to the different parts of a component.
- `styles` An object regrouping all the custom styles you can give to the different parts of a component.

Each part of a component also has a unique class construct like that: `"Arui" + /*the name of the component*/ + "-" + /*the name of the part of the component*/`.

For Example: `AruiCard-root`.

These classes allows you to override the default css properties from a static css file.

## ⛏ Source

- Build

```
yarn workspaces run build
```

- Run Storybook

```
yarn storybook
```

- Release Version on npm from master

```
lerna version 0.0.1 --no-git-tag-version --exact

lerna publish from-package --no-git-reset
```

- Release experimental Version on gitlab from develop

```
lerna version 1.0.0-alpha.1 --no-git-tag-version --exact

yarn publishWorkspaces:gitlab
```

- Create new package

```
cd packages
create-react-library COMPONENT_NAME
```
