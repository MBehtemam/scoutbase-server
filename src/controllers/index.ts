import ActorController from "./ActorController";
import ContinentController from "./ContinentController";
import CountryController from "./CountryController";
import LanguageController from "./LanguageController";
import UserController from "./UserController";
const controllers: {
  user: any;
  continent: any;
  language: any;
  country: any;
  actor: any;
} = {
  actor: new ActorController(),
  continent: new ContinentController(),
  country: new CountryController(),
  language: new LanguageController(),
  user: new UserController()
};

export default controllers;
