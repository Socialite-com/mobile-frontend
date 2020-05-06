import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const getFacebookProfile = () =>
  new Promise(async (resolve, reject) => {
    try {
      const currentAccessToken = await AccessToken.getCurrentAccessToken();

      const graphRequest = new GraphRequest(
        '/me',
        {
          accessToken: currentAccessToken.accessToken,
          parameters: {
            fields: {
              string: 'picture.type(large)',
            },
          },
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.picture.data.url);
          }
        },
      );

      new GraphRequestManager().addRequest(graphRequest).start();
    } catch (error) {
      reject(error);
    }
  });
