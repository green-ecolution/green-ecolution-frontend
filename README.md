# Green Ecolution Frontend

Smart irrigation is needed to save water, staff and costs. This project is the user-interface for Green Ecolution. For Backend please refer to [Green Ecolution Frontend](https://github.com/green-ecolution/green-ecolution-backend)
The user-interface allows users to connect to the backend and interact with it's database. Interactions are possible with:
- trees
- tree clusters
- flower beds
- sensors

While the project is created in collaboration with the local green space management (TBZ Flensburg) this software aims to be applicable for other cities.

- [Roadmap](https://github.com/orgs/green-ecolution/projects/5/views/3)

This project makes use of React working in Vite with HMR and .ESLint rules.
For further information refer to [React + TypeScript + Vite](https://github.com/fresh-app/fresh-vite-app-react-ts)

This project also uses Git-Flow. The main branch stores the official release history while the develop branch serves as an integration branch for features and fixes.
For further information refer to [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Local development

### Requirements
- [node](https://github.com/nodejs/node) JavaScript runtime environment
- [yarn](https://github.com/yarnpkg) Dependency management for JavaScript
- [fnm](https://github.com/Schniz/fnm) Fast and simple Node.js version manager

### Setup

fnm is used download node and npm to install yarn.

Download node
```bash
fnm use
```
Install yarn
```bash
npm install --global yarn
```

### Build

Download dependencies
```bash
yarn
```

Build and start backend-client
```bash
yarn generate:local
yarn rebuild
yarn dev
```

If you not want use the deployed backend the environment variable VITE_BACKEND_BASEURL needs to be changed.
```bash
VITE_BACKEND_BASEURL=/api-dev yarn dev
```

### How to contribute

If you want to contribute to the project please follow this guideline:

- Fork the project.
- Create a topic branch from develop.
- Make some commits to improve the project.
- Push this branch to your GitHub project.
- Open a Pull Request on GitHub.
- Discuss, and optionally continue committing.
- The project owner merges or closes the Pull Request.

Please refer to naming conventions for branches [Medium Article](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).