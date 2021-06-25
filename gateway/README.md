# How to use

## Install gateway and all the microservices
```
yarn installAll
```

## Build all services
```
yarn build
```

## Run all services
This command will run all required services defined in `server.ts` serviceList. The Gateway will start after each of the "microservices" are up and running. If one of the services fail, **gateway won't start**.
```
yarn dev
```

## Build one service
Use one of the commands below to build individual service.
```
yarn build:server
yarn build:user
yarn build:data
yarn build:review
```

## Run one service in dev mode
Use one of the commands below to start individual service.
```
yarn dev:server 
--> yarn dev-unsafe (to prevent waiting for microservices)
yarn dev:user
yarn dev:data
yarn dev:review
```

## Run one production in start mode
Use one of the commands below to start individual service.
```
yarn start:server
yarn start:user
yarn start:data
yarn start:review
```

## Use Prettier to format files.
```
yarn lintFix
```