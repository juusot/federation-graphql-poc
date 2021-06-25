import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const gateway = new ApolloGateway({
  // This service won't run at all,
  // if one of the services isn't up and running.
  // So to remove related service, remove from the serviceList.
  serviceList: [
    { name: 'dataservice', url: 'http://localhost:4001' },
    { name: 'userservice', url: 'http://localhost:4002' },
    { name: 'reviewservice', url: 'http://localhost:4003' },
  ],
});

const server = new ApolloServer({ gateway, subscriptions: false });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
