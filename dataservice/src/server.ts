import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { createContext } from './context';

new ApolloServer({ schema, context: createContext }).listen({ port: 4001 }, () =>
  console.log('Dataservice is running at http://localhost:4001')
);
