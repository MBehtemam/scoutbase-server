import Knex = require("knex");

const resolvers = {
  Query: {
    movies: () => [],
    continents: async (parent: any, args: any, ctx: any, info: any) => {
      try {
        return await ctx.db.continentDB.select("*");
      } catch (err) {
        throw new Error(err);
      }
    },
    languages: async (parent: any, args: any, ctx: any, info: any) => {
      try {
        return await ctx.db.languageDB.select("*");
      } catch (err) {
        throw new Error(err);
      }
    },
    countries: async (parent: any, args: any, ctx: any, info: any) => {
      try {
        let allCountries = await ctx.db.countryDB.select("*");
        const allLanguages = await ctx.db.languageDB.select("*");
        const countrylanguage = await ctx.db.countrylanguageDB.select("*");

        allCountries = allCountries.map((country: any) => {
          const languageIds: string[] = countrylanguage
            .filter((cl: any) => cl.countryId === country.id.toString())
            .map((l: any) => parseInt(l.languageId));
          return {
            ...country,
            languages: allLanguages.filter((l: any) =>
              languageIds.includes(l.id)
            )
          };
        });
        return allCountries;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

export default resolvers;
