import ContinentController from "./ContinentController";
import UserController from "./UserController";
const controllers: {
  user: any;
  continent: any;
} = {
  continent: new ContinentController(),
  user: new UserController()
};

export default controllers;
