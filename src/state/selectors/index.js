import {createSelector} from 'reselect';

const getEventFilter = state => state.selectedEvent.eventFilter;
const getEvents = state => state.userEvents.eventCreations.data;

const parseEventData = createSelector(
  [getEventFilter, getEvents],
  (eventFilter, events) => {
    switch (eventFilter) {
      case 'EVENT_CARD':
        return events.map(e => parseEventCard(e));
    }
  },
);

const pick = (obj, keys) =>
  Object.keys(obj)
    .filter(i => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

export const parseEventCard = event => {
  const profileKeys = ['userName', 'profilePicture'];
  const eventKeys = [
    'title',
    'title',
    'paid',
    'private',
    'startTime',
    'backgroundColor',
    'backgroundImage',
  ];

  const eventDetails = pick(event.details, eventKeys);
  const profileDetails = pick(event.creator, profileKeys);
  return Object.assign({}, eventDetails, profileDetails);
};
