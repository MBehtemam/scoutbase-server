import JWT from "jsonwebtoken";
import secretKeys from "../config/secretKeys";
import DB from "../DB";
import IDB from "../interfaces/IDB";

class UserController {
  db: IDB;
  constructor() {
    this.db = DB;
  }
  async hasUserByUserName(username: string) {
    try {
      const has = await this.db.user
        .select()
        .where("username", username)
        .first();
      if (has) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }
  async hasUserByUserNameAndPassword(username: string, password: string) {
    try {
      const has = await this.db.user
        .select()
        .where({ username, password })
        .first();
      if (has) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }
  async createUser(username: string, password: string) {
    try {
      const has = await this.hasUserByUserName(username);
      if (has) {
        throw new Error("user already exist");
      } else {
        const userId = await this.db.user.insert({
          username,
          password,
          name: ""
        });
        const user = await this.getUserById(userId[0]);
        return this.addTokenToUser(user);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async loginUser(username: string, password: string) {
    try {
      const has = await this.hasUserByUserNameAndPassword(username, password);
      if (has) {
        const userWithouttoken = await this.getUserByUserName(username);
        return this.addTokenToUser(userWithouttoken);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async getUserById(id: string) {
    try {
      const user = await this.db
        .Knex("user")
        .select()
        .where("id", id);
      return user[0];
    } catch (err) {
      return err;
    }
  }
  async getUserByUserName(username: string) {
    try {
      return await this.db.user
        .select()
        .where("username", username)
        .first();
    } catch (err) {
      return err;
    }
  }
  addTokenToUser(user: any) {
    const { id, name }: { id: string; name: string } = user;
    const token = JWT.sign({ id, name }, secretKeys.USER_TOKEN);
    return {
      user,
      token
    };
  }
  async authenticate(token: string) {
    try {
      const userToken = token.split(" ")[1];
      if (userToken) {
        const verifiedUser: any = JWT.verify(userToken, secretKeys.USER_TOKEN);
        if (verifiedUser) {
          const user = await this.getUserById(verifiedUser.id);
          if (user) {
            return this.addTokenToUser(user);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }
}
export default UserController;
