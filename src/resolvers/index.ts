import JWT from "jsonwebtoken";

const resolvers = {
  Query: {
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
    },
    movies: async (parent: any, args: any, ctx: any, info: any) => {
      const allMovies = await ctx.db.movieDB.select();
      const allActors = await ctx.db.actorDB.select();
      const allDirectors = await ctx.db.directorDB.select();
      const allMovieActor = await ctx.db.movieActorDB.select();
      const allMovieDirector = await ctx.db.movieDirectorDB.select();
      return allMovies.map((movie: any) => {
        const actorsIds = allMovieActor
          .filter((m: any) => m.movieId === movie.id)
          .map((a: any) => a.actorId);
        const directorsId = allMovieDirector
          .filter((m: any) => m.movieId === movie.id)
          .map((d: any) => d.directorId);

        return {
          ...movie,
          directors: allDirectors.filter((d: any) =>
            directorsId.includes(d.id)
          ),
          actors: allActors.filter((a: any) => actorsIds.includes(a.id)),
          scoutbase_rating: ctx.user
            ? (Math.random() * (9 - 5 + 1) + 5).toFixed(2).toString()
            : null
        };
      });
    }
  },
  Mutation: {
    createUser: async (
      parent: any,
      { username, password }: { username: string; password: string },
      ctx: any,
      info: any
    ) => await ctx.controllers.user.createUser(username, password),
    login: async (
      parent: any,
      { username, password }: { username: string; password: string },
      ctx: any,
      info: any
    ) => await ctx.controllers.user.loginUser(username, password)
  }
};

export default resolvers;
