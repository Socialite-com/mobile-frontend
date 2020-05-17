import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';

export const links = [
  {
    name: 'instagram',
    icon: 'instagram',
    details: 'Post about your party on your Instagram feed.',
  },
  {
    name: 'instagram-stories',
    icon: 'instagram',
    details: 'Promote your party on your Instagram story.',
  },
  {
    name: 'facebook',
    icon: 'facebook',
    details: 'Post about your party on your Facebook feed.',
  },
  {
    name: 'facebook-stories',
    icon: 'facebook',
    details: 'Promote your party on your Facebook story.',
  },
  {
    name: 'more',
    icon: 'more-horizontal',
    details:
      'Share your invite through email, text message, messenger, snapchat and more.',
  },
];

export function shareLink(type, data) {
  let options = {};
  switch (type) {
    case 'instagram':
      return CameraRoll.saveToCameraRoll(data.details.backgroundImage).then(
        () => {
          return Share.shareSingle(
            Object.assign({}, options, {
              title: 'Share via instagram',
              social: Share.Social.INSTAGRAM,
              url: data.details.backgroundImage,
              forceDialog: true,
            }),
          );
        },
      );
    case 'instagram-stories':
      return Share.shareSingle(
        Object.assign({}, options, {
          title: 'Share via',
          method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
          // stickerImage: data.details.qrcode,
          backgroundImage: data.details.backgroundImage,
          social: Share.Social.INSTAGRAM_STORIES,
          url: 'http://www.google.com',
        }),
      );
    case 'facebook':
      return Share.shareSingle(
        Object.assign({}, options, {
          social: Share.Social.FACEBOOK,
          url: 'http://www.google.com',
          appId: '190427862247522',
        }),
      );
    case 'facebook-stories':
      return Share.shareSingle(
        Object.assign({}, options, {
          method: Share.FacebookStories.SHARE_BACKGROUND_IMAGE,
          backgroundImage: data.details.backgroundImage,
          social: Share.Social.FACEBOOK_STORIES,
          appId: '190427862247522',
        }),
      );
    case 'twitter':
      return Share.shareSingle(
        Object.assign({}, options, {
          social: Share.Social.TWITTER,
          url: 'http://www.google.com',
        }),
      );
    case 'email':
      return Share.shareSingle(
        Object.assign({}, options, {
          title: 'Share file',
          failOnCancel: false,
          social: Share.Social.EMAIL,
          url: 'http://www.google.com',
          email: 'email@example.com',
        }),
      );
    case 'more':
      return Share.open(
        Object.assign({}, options, {
          url: 'http://127.0.0.1:5000',
          activityItemSources: [
            {
              thumbnailImage: data.details.qrcode,
              linkMetadata: {
                title: data.details.title,
              },
            },
          ],
        }),
      );
    default:
      break;
  }
}
