const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { addMocksToSchema } = require("@graphql-tools/mock");

const port = process.env.PORT ?? 4002;

async function main() {
  const typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );
  const server = new ApolloServer({
    debug: true,
    schema: addMocksToSchema({
      schema: buildSubgraphSchema({ typeDefs }),
      preserveResolvers: true,
    }),
    plugins: [
      {
        async requestDidStart() {
          return {
            async executionDidStart() {
              return {
                willResolveField({ info }) {
                  const keys = [info.path.key];
                  let path = info.path;
                  while (path.prev) {
                    path = path.prev;
                    keys.push(path.key);
                  }
                  if (keys.includes("_service")) return;
                  console.log(keys.reverse().join("."));
                },
              };
            },
          };
        },
      },
    ],
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      // Add what you need at context creation
      //  to be available in resovlers (i.e. context.foos)
      //
      // auth: req.headers.authentication,
      // foos: new FooDataSource(),
    }),
    listen: { port },
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `Run 'rover dev --url http://localhost:${port} -p 4000 --name subgraph'`
  );
}

main();
