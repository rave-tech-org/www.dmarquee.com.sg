## Introduction

This project will serve as a submodule for every future project we build. It aims to include a variety of reusable UI elements and functionalities.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

# Project Folder Structure

```
src/
├── app/
├── components/
│   ├── elements/
│   │   └── **/*.(tsx|ts|scss)
│   └── pages/
│       └── **/section-(one~ten)/*.(tsx|ts|scss)
└── styles/
    └── *.(scss|css)
```

# Update new changes from rave-ui using git submodule

If this is your first time interacting with the submodule or you just cloned the main repository:

```
git submodule update --init --recursive
```

If the submodule already exists and you want to pull the latest changes:

```
git submodule update --remote --merge

```

# Potential issues with gitsubmodule

If you accidentally touch or changed inside rave-ui(gitsubmodule), you need to clear your changes.

```
cd rave-ui

git status

git checkout .
```

# Sanity

To run sanity make sure to install sanity cli first.


# Migration content data

Make sure to setup sanity client with targeted projectId

To export project
```
cd to-path-file
sanity dataset export production ./<to-path-file>.tar.gz production 
```

To import project

```
cd to-path-file
sanity dataset import ./<to-path-file>.tar.gz production 
```