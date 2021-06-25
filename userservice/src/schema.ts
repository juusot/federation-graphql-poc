import { makeSchema, objectType, stringArg, nonNull } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { transformSchemaFederation } from 'graphql-transform-federation';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.phoneNumber();
    t.model.posts();
  },
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.author();
    t.model.authorId();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.users();
    t.crud.posts();

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: nonNull(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }],
          },
        });
      },
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' });
    t.crud.deleteOnePost();

    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: nonNull(stringArg()),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Post, User],
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
  User: {
    keyFields: ['id'],
  },
});

export default federatedSchema;
