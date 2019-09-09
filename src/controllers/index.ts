import ActorController from "./ActorController";
import ContinentController from "./ContinentController";
import CountryController from "./CountryController";
import LanguageController from "./LanguageController";
import UserController from "./UserController";
import DirectorController from "./DirectorController";
const controllers: {
  user: any;
  continent: any;
  language: any;
  country: any;
  actor: any;
  director: any;
} = {
  actor: new ActorController(),
  continent: new ContinentController(),
  country: new CountryController(),
  language: new LanguageController(),
  user: new UserController(),
  director: new DirectorController()
};

export default controllers;
