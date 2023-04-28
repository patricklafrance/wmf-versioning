# wmf-poc-template

This is a template to create POC related to [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/).

The template contains 3 applications:
- An [host application](./packages/host/)
- A remote module named [remote-1](./packages/remote-1/)
- A remote module named [remote-2](./packages/remote-2/)

## Usage

First install the dependencies with PNPM:

```bash
pnpm install
```

Then start the application in dev mode (make sure ports 8080, 8081 and 8082 are available):

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