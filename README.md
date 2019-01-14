# Typescript React Redux Boilerplate
[![Build Status](https://travis-ci.org/kayKayEhnn/typescript-react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/kayKayEhnn/typescript-react-redux-boilerplate)

### What's included:
- TypeScript
- TSLint configured with Standard Style settings
- React & Redux
- Redux DevTools via Chrome extension
- SASS & CSS Modules
- Webpack configuration with Hot Module Replacement
- Jest setup for TypeScript
- An example architecture for building scalable applications

### Usage
- Clone the project
- ```rm -rf .git```
- ```git init```
- Update ```package.json``` with relevant settings (name, description, keywords, etc.)
- Find all lines (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> :wink:) annotated with "FIXME:" and change where needed if defaults don't suit your use case.

See [Commands](#commands) for more information.

---

### Folder Structure
```
.
├── __tests__
├──── {test_directories}
├────── {test_files.test.ts}
├──── tsconfig.json
├
├── config
├──── postscss.config.js
├──── webpack.config.{base,dev,prod}.ts
├──── tsconfig.json
├
├── public
├──── index.html
├──── static
├────── images
├────── fonts
├────── icons
├────── etc.
├
├── src
├──── components
├────── {Component}
├──────── {index.ts}
├──────── {component.ts}
├──────── {component.scss}
├──────── {component.scss.d.ts}
├──── containers
├────── {ContainerContainer.tsx}
├──── declarations
├────── styles.d.ts
├──── store
├────── actions
├──────── {action}.ts
├──────── index.ts
├────── reducers
├──────── {reducer}.ts
├──────── index.ts
├──────── state
├────────── AppState.ts
├────────── {state_part}State.ts
├──────── configureStore.ts
├──── types
├────── DisconnectAction.ts
├────── MapDispatchToProps.ts
├────── MapStateToProps.ts
├────── Store.ts
├────── ThunkAction.ts
├──── index.tsx
├──── polyfills.ts
├
├── jest.config.js
├── package.json
├── tsconfig.json
├── tslint.json
├── tsproject.json
├── webpack.config.ts
```

### The src folder

#### Components
All presentational components reside here. They can be split in two types:
- **Views** - views are usually passed to connect function and later serve as app routes.
- **Subcomponents** - subcomponents are smaller and serve as building blocks for the views.

<!--- (TODO: Add links to all types of props/state definitions) --->

These components are either stateless or hold only UI state. Props shape is defined in a container as the union of MapStateFromProps and MapDispatchFromProps for views and as an interface in the same file for subcomponents. State shape is always defined next to the component where applicable.

Component folders consist of 4 files for ease of navigation in editor (Quick Open behaves as expected when searching by component name) and brevity when importing (@Components/Component instead of @Components/Component/Component). This approach also allows splitting components in multiple files, which further improves maintainability.

#### Containers
**Containers** export higher-order components, connecting views to the Redux store. They define the data passed to components via MapStateToProps and the actions they can trigger via MapDispatchToProps. Those mappings use modified interfaces (`types`) which enforce certain restrictions and simplify the usage of built-in types in redux and react-redux.

#### Declarations
**Declarations** serve for defining usage of miscellaneous file types, which get processed by webpack loaders, e.g. styles, vectors, graphql etc.

#### Store
**Actions** define the action types and action creators. They also export a union of their action types, which is then used for strongly typing `dispatch` calls.

**Reducers'** signatures are defined using State and ActionType types and by using `switch..case` branches for each action we get strong typing, courtesy of [Discriminated Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions).

**State** holds shape definitions of the different pieces of data the reducers manage. AppState shows the shape of the whole state tree.

#### Types
**Types** holds overridden definitions of intrinsic redux and react-redux types. They serve mainly for brevity when defining containers and actions but they also solve type definitions problems with redux-thunk middleware.

#### Index and Polyfills
**Index** is the main entry point. It takes care of bootstrapping the application and shouldn't hold any program logic.
**Polyfills** is an entry point containing polyfills for older browsers. It gets processed in a separate bundle and is loaded conditionally by a test in [index.html](https://github.com/kayKayEhnn/typescript-react-redux-boilerplate/blob/318ca1247e1446a95f43e6410f4764159fb77a49/public/index.html#L18-L27).

---

### Commands

Install dependencies
```bash
npm install
```

Run development server
```bash
npm start
```

Build for production:
```bash
npm run build
```

Run tests:
```bash
npm test
```

### Credits
 - [Create React App](https://github.com/facebook/create-react-app) This project is heavily inspired by CRA.