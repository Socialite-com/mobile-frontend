import AccessEvent from './onboarding/AccessEvent';
import LinkRegister from './onboarding/LinkRegister';
import Landing from './onboarding/Landing';
import PhoneAuthScreen from './onboarding/PhoneAuthScreen';
import UserName from './onboarding/UserName';
import CreatePassword from './onboarding/CreatePassword';
import EnterPassword from './onboarding/EnterPassword';
import SplashScreen from './onboarding/SplashScreen';
import GetCode from './onboarding/GetCode';

//import GetCodes from './onboarding/GetCodes';
//import OAuth from './onboarding/qrCodes/OAuth';
//import SignUp from './onboarding/qrCodes/SignUp';

import Event from './user/Event';
import Home from './user/Home';
import Browse from './user/Browse';
import Activity from './user/Activity';

import Settings from './userOptions/Settings';

import EventName from './organizer/EventName';
import EventType from './organizer/EventType';
import EventTime from './organizer/EventTime';
import EventLocation from './organizer/EventLocation';
import EventPrice from './organizer/EventPrice';

import EventPage from './events/view/EventPage';
import GuestList from './events/view/GuestList';
import Discover from './events/view/Discover';

import ManageEvent from './events/manage/ManageEvent';
import InviteGuests from './events/manage/InviteGuests';
import EditEventPage from './events/manage/EditEventPage';

const screens = {
  onboarding: {
    // GetCodes: GetCodes,
    // OAuth: OAuth,
    // SignUp: SignUp,
    AccessEvent: AccessEvent,
    LinkRegister: LinkRegister,
    Landing: Landing,
    GetCode: GetCode,
    PhoneAuthScreen: PhoneAuthScreen,
    UserName: UserName,
    CreatePassword: CreatePassword,
    EnterPassword: EnterPassword,
    SplashScreen: SplashScreen,
  },
  user: {
    Event: Event,
    Home: Home,
    Browse: Browse,
    Activity: Activity,

    options: {
      Settings: Settings,
    },
  },
  organizer: {
    EventName: EventName,
    EventType: EventType,
    EventTime: EventTime,
    EventPrice: EventPrice,
    EventLocation: EventLocation,
  },
  events: {
    manage: {
      InviteGuests: InviteGuests,
      EditEventPage: EditEventPage,
      ManageEvent: ManageEvent,
    },
    view: {
      GuestList: GuestList,
      EventPage: EventPage,
      Discover: Discover,
    },
  },
};

export default screens;
