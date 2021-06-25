import { makeSchema, objectType, stringArg, intArg, nonNull, extendType } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformSchemaFederation } from 'graphql-transform-federation';

// This extends User model, which is defined in userservice.
export const User = extendType({
  type: 'User',
  definition: t => {
    // Id type is manually types, so if User model's id would
    // change it's type, this would have to be changed.
    t.nonNull.int('id');

    // This tells User model where it can find the reviews.
    t.list.field('reviews', {
      type: Review,
      async resolve(user, args, ctx) {
        return await ctx.prisma.review.findMany({
          where: { userId: user.id },
        });
      },
    });
  },
});

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.userId();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.reviews();
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.deleteOneReview();

    t.field('createReview', {
      type: Review,
      args: {
        content: stringArg(),
        userId: nonNull(intArg()),
      },
      resolve: (_, { content, userId }, ctx) => {
        return ctx.prisma.review.create({
          data: {
            content,
            userId,
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Review, User],
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

  /*
    This tells Gateway to extend User model based on
    the schema defined in this file.
    
    Other examples using pure apollo-federation:
    https://www.apollographql.com/docs/federation/

    Good example how to build project using
    NexusJS + Prisma + Apollo Federation
    can be found here:
    https://github.com/ricardoalmeida/federation-nexus-prisma

    The syntax used below can be found here:
    https://www.npmjs.com/package/graphql-transform-federation
  */
  User: {
    extend: true,
    keyFields: ['id'],
    fields: {
      id: {
        external: true,
      },
    },
  },
});

export default federatedSchema;
