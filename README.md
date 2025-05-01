<p>
  <a href="https://github.com/green-ecolution/frontend/releases">
    <img alt="GitHub Release" src="https://img.shields.io/github/v/release/green-ecolution/frontend"/>
  </a>
  <a href=""><img alt="License" src="https://img.shields.io/github/license/green-ecolution/frontend.svg"/></a>
  <a href=""><img alt="Maintained yes" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"/></a>
</p>

# Green Ecolution Frontend 🌿

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ea25141-135a-493c-b9f6-e1cbc7a7aa41"/>
</p>

Smart irrigation is essential to saving water, reducing staff workload, and cutting costs. This project provides the user interface for Green Ecolution — a digital system to manage urban greenery efficiently.

👉 For the backend implementation, visit the [Green Ecolution Backend.](https://github.com/green-ecolution/backend)

The frontend connects to the backend and enables users to interact with:

- 🌳 Trees
- 🌿 Tree clusters
- 📡 Sensors
- 🗺️ Watering plans
- 🚛 Vehicles
- 👤 Users

Developed in collaboration with **TBZ Flensburg**, this software is designed to be adaptable for other cities. It originated as a research project within the **Applied Computer Science Master's program** at the **University of Applied Sciences Flensburg**.

For further information, visit:

- [🌐 Project website](https://green-ecolution.de/)
- [🎓 University of Applied Sciences Flensburg](https://hs-flensburg.de/en)
- [🖥️ Live demo](https://demo.green-ecolution.de)

## Technologies Used ⚙️

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) for fast development and HMR
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) for code linting
- [Yarn](https://yarnpkg.com/) for dependency management
- [fnm](https://github.com/Schniz/fnm) for Node.js version management

## Local development 💻

### Requirements

- [Node.js](https://github.com/nodejs/node)
- [Yarn](https://github.com/yarnpkg)
- [fnm](https://github.com/Schniz/fnm)

### Initial Setup ⚙️

Install the required Node.js version:

```bash
fnm use
```

Install Yarn globally:

```bash
npm install --global yarn
```

Install dependencies:

```bash
yarn
```

## Running the Project ▶️

Build the local backend-client and start the frontend:

```bash
yarn generate:local
yarn rebuild
yarn dev
```

By default, the app connects to the local running backend `localhost:3000`. If you want to use the deployed stage backend instance instead, adjust the `VITE_BACKEND_BASEURL` environment variable:

```bash
VITE_BACKEND_BASEURL=/api-stage yarn dev
```

### How to Contribute 🤝

We welcome contributions! Please follow these guidelines:

1. Fork this repository.
1. Create a topic branch off develop.
1. Commit your changes.
1. Push your branch to your fork.
1. Open a Pull Request.

This project follows:

- [Git-Flow Workflow](https://danielkummer.github.io/git-flow-cheatsheet/) for branching and releases.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

Thank you for helping us improve Green Ecolution! 🌿
