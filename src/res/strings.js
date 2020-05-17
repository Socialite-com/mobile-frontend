// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const strings = {
  onboarding: {
    register: {
      title: 'Become a Socialite',
      prompt: 'Please enter your mobile number below to get started.',
    },
    signIn: {
      title: 'Sign In',
      prompt: 'You know what to do.',
    },
    getCode: {
      scanner:
        "Please make sure your Socialite code isn't blurry and that your event card is valid.",
      key: 'Please make sure your event key is correctly inputted',
    },
  },
  user: {},
  event: {},
};

export default strings;
