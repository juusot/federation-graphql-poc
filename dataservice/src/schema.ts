import { makeSchema, objectType, stringArg, nonNull } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformSchemaFederation } from 'graphql-transform-federation';

const Receipe = objectType({
  name: 'Receipe',
  definition(t) {
    t.model.title();
    t.model.content();
    t.model.source();
    t.model.id();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.receipes();
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.deleteOneReceipe();

    t.field('createReceipe', {
      type: Receipe,
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        source: nonNull(stringArg()),
      },
      resolve: (_, { title, content, source }, ctx) => {
        return ctx.prisma.receipe.create({
          data: {
            title,
            content,
            source,
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Receipe],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

const federatedSchema = transformSchemaFederation(schema, {
  Query: {
    extend: true,
  },
});

export default federatedSchema;
