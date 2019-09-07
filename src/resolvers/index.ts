const resolvers = {
  Query: {
    movies: () => [],
    continents: async (parent: any, args: any, ctx: any, info: any) => {
      try {
        return await ctx.db.continentDB.select("*");
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

export default resolvers;
