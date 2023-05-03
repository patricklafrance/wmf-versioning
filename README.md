# wmf-versioning

## Usage

The repository contains 3 applications:
- An [host application](./packages/host/)
- A remote module named [remote-1](./packages/remote-1/)
- A remote module named [remote-2](./packages/remote-2/)

First install the dependencies with PNPM:

```bash
pnpm install
```

### Development server

To start the application in dev mode (make sure ports 8080, 8081 and 8082 are available):

```bash
pnpm dev
```

Open a browser at http://localhost:8080/.

The remote module entries are available at:
- http://localhost:8081/remoteEntry.js for remote-1
- http://localhost:8082/remoteEntry.js for remote-2

If you prefer to start the application and modules separately:

```bash
cd packages/host
pnpm dev
```

```bash
cd packages/remote-1
pnpm dev
```

```bash
cd packages/remote-2
pnpm dev
```

### Production build

To start the application with production build (make sure ports 8080, 8081 and 8082 are available):

```bash
pnpm serve-build
```

## Learnings

### When no dependencies are shared

With the host application and both remotes having:

- `react` version `18.2.0`
- `react-dom` version `18.2.0`
- `useless-lib` version `3.0.0`

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    }
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    }
})
```

`react`, `react-dom` and `useless-lib` are included in the host application bundle and both remote module bundles:

- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_client_js-node-780c21.js
- http://localhost:8081/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_jsx-runtime_js-node_modules_pnpm_us-d19814.js
- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_jsx-runtime_js-node_modules_pnpm_us-cf5ae6.js

### When a dependency is shared without any option

With the host application and both remotes having:

- `react` version `18.2.0`
- `react-dom` version `18.2.0`
- `useless-lib` version `3.0.0`

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: ["react", "react-dom", "useless-lib"] <------
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: ["react", "react-dom", "useless-lib"] <------
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: ["react", "react-dom", "useless-lib"] <------
})
```

`react`, `react-dom` and `useless-lib` are included once:

- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_index_js.js (react)
- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_index_js.js (react-dom)
- http://localhost:8082/node_modules_pnpm_useless-lib_3_0_0_node_modules_useless-lib_index_js.js (useless-lib)

#### When the remote dependency version differs

With the following dependencies:

```js
// host/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

```js
// remote-1/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.1.0" <------
}
```

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

2 versions of the `useless-lib` dependency is loaded:

- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_index_js.js (react)
- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_index_js.js (react-dom)
- http://localhost:8082/node_modules_pnpm_useless-lib_2_0_0_node_modules_useless-lib_index_js.js (useless-lib 2.0) <------
- http://localhost:8081/node_modules_pnpm_useless-lib_2_1_0_node_modules_useless-lib_index_js.js (useless-lib 2.1) <------

### When a dependendy is shared as a singleton

With the host application and both remotes having:

- `react` version `18.2.0`
- `react-dom` version `18.2.0`
- `useless-lib` version `3.0.0`

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true
        }
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true
        }
    }
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true
        }
    }
})
```

`react`, `react-dom` and `useless-lib` are included once:

- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_index_js.js (react)
- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_index_js.js (react-dom)
- http://localhost:8082/node_modules_pnpm_useless-lib_3_0_0_node_modules_useless-lib_index_js.js (useless-lib)

#### When the remote dependency version differs but is compatible (not a different major version)

With the following dependencies:

```js
// host/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

```js
// remote-1/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.1.0" <------
}
```

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

`react`, `react-dom` and `useless-lib` are included once, 2.1.0 is loaded for `useless-lib` as it is the highest compatible version:

- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_index_js.js (react)
- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_index_js.js (react-dom)
- http://localhost:8081/node_modules_pnpm_useless-lib_2_1_0_node_modules_useless-lib_index_js.js (useless-lib)

#### When the host dependency version differs from a remote required version

With the following dependencies:

```js
// host/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

```js
// remote-1/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.1.0" <------
}
```

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true
        }
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true,
            requiredVersion: "2.1.0", <------
            strictVersion: true <------
        }
    }
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true
        }
    }
})
```

The following warning is printed and the host application and the remote modules used version 2.1 (which seems suspicious)

> Unsatisfied version 2.1.0 from remote-1 of shared singleton module useless-lib (required =2.0.0)

#### Same test as the previous one but with the host application and remote-2 also specifying a requiredVersion

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "2.0.0" <------
}
```

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true,
            requiredVersion: "2.0.0", <------
            strictVersion: true <------
        }
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true,
            requiredVersion: "2.1.0", <------
            strictVersion: true <------
        }
    }
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            singleton: true,
            requiredVersion: "2.0.0", <------
            strictVersion: true <------
        }
    }
})
```

The following error is thrown:

> Uncaught (in promise) Error: Unsatisfied version 2.1.0 from remote-1 of shared singleton module useless-lib (required =2.0.0)

### When a dependency is eagerly loaded

With the following dependencies:

```js
// host/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "3.0.0"
}
```

```js
// remote-1/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "3.0.0"
}
```

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "3.0.0"
}
```

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {
            eager: true <------
        }
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {}
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "useless-lib": {}
    }
})
```

`react`, `react-dom` and `useless-lib` are included once and `useless-libs` is included in the main bundle rather than it's own file:

- http://localhost:8082/vendors-node_modules_pnpm_react_18_2_0_node_modules_react_index_js.js (react)
- http://localhost:8080/vendors-node_modules_pnpm_react-dom_18_2_0_react_18_2_0_node_modules_react-dom_index_js.js (react-dom)
- http://localhost:8080/main.js (useless-lib)

### Using React 17 and React 18 in parallel

With the following dependencies:

```js
// host/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "3.0.0",
    "shared": "workspace:*"
}
```

```js
// remote-1/package.json

{
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "useless-lib": "3.0.0",
    "shared": "workspace:*"
}
```

```js
// remote-2/package.json

{
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "useless-lib": "3.0.0",
    "shared": "workspace:*"
}
```

And the following `ModuleFederationPlugin` config:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "shared": {
            singleton: true
        },
        "useless-lib": {}
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "shared": {
            singleton: true
        },
        "useless-lib": {}
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {
            singleton: true
        },
        "react-dom": {
            singleton: true
        },
        "shared": {
            singleton: true
        },
        "useless-lib": {}
    }
})
```

Since `react` 18 is kind of backward compatible with `react` 17 everything seems to work fine. Because `react` is defined as a shared "singleton", ONLY react **18.2.0** is loaded.

That wouldn't work thought if "remote-1" is using something that has been deprecated in `react` 18.

#### Same test but with React dependency not being a "singleton"

The new `ModuleFederationConfig` config for this test is:

```js
// host/webpack.dev.js - 8080

new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remote1: "remote1@http://localhost:8081/remoteEntry.js",
        remote2: "remote2@http://localhost:8082/remoteEntry.js"
    },
    shared: {
        "react": {},
        "react-dom": {},
        "shared": {
            singleton: true
        },
        "useless-lib": {}
    }
})
```

```js
// remote-1/webpack.dev.js - 8081

new ModuleFederationPlugin({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {},
        "react-dom": {},
        "shared": {
            singleton: true
        },
        "useless-lib": {}
})
```

```js
// remote-2/webpack.dev.js - 8082

new ModuleFederationPlugin({
    name: "remote2",
    filename: "remoteEntry.js",
    exposes: {
        "./HelloWorld.jsx": "./src/HelloWorld.jsx"
    },
    shared: {
        "react": {},
        "react-dom": {},
        "shared": {
            singleton: true
        },
        "useless-lib": {}
    }
})
```

Since a "singleton" is not requested anymore, when "remote-1" is loaded, `react` 17.0.2 is also loaded:

- http://localhost:8081/vendors-node_modules_pnpm_react_17_0_2_node_modules_react_index_js.js
- http://localhost:8081/vendors-node_modules_pnpm_react_17_0_2_node_modules_react_jsx-runtime_js.js

What's actually interesting is that sharing a `React.context` value between the host applications and "remote-1" is working. The reason is because the source code of the context is defined in the `shared` package which is defined as a "singleton".

However, hooks depending on having a single instance of `react`, like the `useState` hook won't work. Adding a `useState` hook to "remote-1" throw the following error:

> Invalid hook call. Hooks can only be called inside of the body of a function component

### Using multiple version of react-router in parallel

`react-router` must be defined as a "singleton" because it relies on `React.context` which doesn't works otherwise (returns undefined values).

Bottomline, the requirements for `react-router` is to be defined as "singleton" and that every codebase depends on code that is backward compatible with the highest required version of the package.

### Conclusion

- The default sharing behavior of Webpack Module Federation is quite smart and should be leverage whenever possible. It will only load the highest compatible version when possible, e.g. that if 10.0 and 10.1 are required only 10.1 will be loaded but if 11.0 and 10.1 it will load both because distinct major versions are considered as incompatible

- `react` should always be defined as a "singleton", otherwise hooks like `useState` will not work

- `react-router` should always be defined as a "singleton" because it depends on `React.context`

- Any package sharing a `React.context` must be defined as "singleton", otherwise, values will be null for remotes

- Dependencies required initially should be eagerly loaded by adding `eager: true` in the host application module federation config.