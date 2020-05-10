// api calls to retrieve gmaps information
import R from 'res/R';

export default class maps {
  static autocomplete(value) {
    return new Promise((resolve, reject) => {
      const placesAPI = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&components=country:us|country:ca&language=en&key=${R.keys.mapSearch}`;
      fetch(placesAPI)
        .then(res => res.json())
        .then(data => {
          if (data.predictions.length > 0) {
            resolve(data.predictions);
          }
        })
        .catch(err => reject(err.message));
    });
  }

  static geocode = placeId =>
    new Promise((resolve, reject) => {
      const geocodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${R.keys.mapSearch}`;
      fetch(geocodeAPI)
        .then(res => res.json())
        .then(data => {
          if (data.results.length > 0) {
            resolve(data.results[0]);
          } else {
            reject('Invalid geocode');
          }
        })
        .catch(err => reject(err.message));
    });
}
