import AccessEvent from "./onboarding/AccessEvent";
import LinkRegister from "./onboarding/LinkRegister";
import GetCodes from "./onboarding/GetCodes";
import Landing from "./onboarding/Landing";
import OAuth from "./onboarding/OAuth";
import PhoneAuthScreen from "./onboarding/PhoneAuthScreen";
import SignUp from "./onboarding/SignUp";
import UserName from "./onboarding/UserName";
import CreatePassword from "./onboarding/CreatePassword";
import EnterPassword from "./onboarding/EnterPassword";
import SplashScreen from "./onboarding/SplashScreen";

import Event from "./user/Event";
import Home from "./user/Home";

import EventName from "./organizer/EventName";

const screens = {
  onboarding: {
    AccessEvent: AccessEvent,
    LinkRegister: LinkRegister,
    GetCodes: GetCodes,
    Landing: Landing,
    OAuth: OAuth,
    PhoneAuthScreen: PhoneAuthScreen,
    SignUp: SignUp,
    UserName: UserName,
    CreatePassword: CreatePassword,
    EnterPassword: EnterPassword,
    SplashScreen: SplashScreen
  },
  user: {
    Event: Event,
    Home: Home,
  },
  organizer: {
    EventName: EventName
  }
};

export default screens;