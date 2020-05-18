import AccessEvent from './onboarding/AccessEvent';
import LinkRegister from './onboarding/LinkRegister';
import Landing from './onboarding/Landing';
import PhoneAuthScreen from './onboarding/PhoneAuthScreen';
import UserName from './onboarding/UserName';
import SplashScreen from './onboarding/SplashScreen';
import GetCode from './onboarding/GetCode';

import Home from './user/Home';
import Browse from './user/Browse';
import Activity from './user/Activity';

import Settings from './userOptions/Settings';

import EventName from './organizer/deprecated/EventName';
import EventType from './organizer/EventType';
import EventTime from './organizer/EventTime';
import EventLocation from './organizer/EventLocation';
import EventPrice from './organizer/deprecated/EventPrice';

import ManageEvent from './events/manage/ManageEvent';
import InviteGuests from './events/manage/InviteGuests';
import EditEventPage from './events/manage/EditEventPage';
import Discover from './events/manage/Discover';
import ShareEvent from './events/actions/Share';
import EditEvent from './events/actions/Edit';
import Payment from './events/actions/Pay';

import SelectChat from './chats/SelectChat';
import Chat from './chats/Chat';

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
    SplashScreen: SplashScreen,
  },
  user: {
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
    InviteGuests: InviteGuests,
    EditEventPage: EditEventPage,
    ManageEvent: ManageEvent,
    ShareEvent: ShareEvent,
    EditEvent: EditEvent,
    Discover: Discover,
    Payment: Payment,
  },
  chat: {
    SelectChat: SelectChat,
    Chat: Chat,
  },
};

export default screens;
