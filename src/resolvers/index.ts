import JWT from "jsonwebtoken";

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
        const countrycontinent = await ctx.db.countrycontinentDB.select("*");
        const allContinents = await ctx.db.continentDB.select("*");
        allCountries = allCountries.map((country: any) => {
          const languageIds: string[] = countrylanguage
            .filter((cl: any) => cl.countryId === country.id.toString())
            .map((l: any) => parseInt(l.languageId));
          const continentId = countrycontinent.find(
            (cc: any) => cc.countryId == country.id
          ).continentId;
          return {
            ...country,
            languages: allLanguages.filter((l: any) =>
              languageIds.includes(l.id)
            ),
            continent: allContinents.find((c: any) => c.id === continentId)
          };
        });
        return allCountries;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createUser: async (
      parent: any,
      { username, password }: { username: string; password: string },
      ctx: any,
      info: any
    ) => {
      try {
        const userExists = await ctx.db.userDB
          .select()
          .where("username", username)
          .first();
        if (userExists) {
          throw new Error("user already exists");
        } else {
          const user = await ctx.db.userDB.insert({
            username,
            password,
            name: ""
          });
          const newUser = await ctx.db
            .Knex("user")
            .select()
            .where("id", user[0].toString())
            .first();

          return {
            user: newUser,
            token: JWT.sign({ id: newUser.id, name: newUser.name }, "something")
          };
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

export default resolvers;
