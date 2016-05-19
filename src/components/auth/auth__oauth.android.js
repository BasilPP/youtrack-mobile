import {Linking, BackAndroid} from 'react-native';

import qs from 'qs';

function openAuthPage(config) {
  //Exit the app before open link to kill this intent - the new one will be created
  BackAndroid.exitApp();

  Linking.openURL([
    `${config.auth.serverUri}/api/rest/oauth2/auth`,
    '?response_type=code',
    '&access_type=offline',
    `&client_id=${config.auth.clientId}`,
    `&scope=${config.auth.scopes}`,
    `&redirect_uri=${config.auth.landingUrl}`
  ].join(''));

  //Never resolve this
  return new Promise(resolve => {
  });
}

module.exports = {
  checkIfBeingAuthorizing: () => {
    return Linking.getInitialURL()
      .then(url => {
        if (url) {
          let [, query_string] = url.match(/\?(.*)/);
          const code = qs.parse(query_string).code;
          if (!code) {
            throw new Error(`Cannot extract code from url ${url}`);
          }
          return code;
        } else {
          return Promise.reject('Initial url doesn\'t found');
        }
      });
  },
  authorizeInHub: openAuthPage
};
