# How to use

## Install
```
yarn
```

## Automatically update generated files and run the project
Nodemon will check if files are changed and re-run `yarn generate` and `yarn dev` commands.
```
yarn devWatch
```

## Generate database based on `schema.prisma`
Note! This command won't overwrire existing database if there are conflicts. See console messages for overwriting the whole database.
```
yarn prismaPush
```

## Generate necessary files
This command should be ran every time the `schema.prisma` is changed.
```
yarn generate
```

## Run service in develop mode
```
yarn dev
```

## Run service in production mode
```
yarn start
```

## Use Prettier to format files.
```
yarn lintFix
```