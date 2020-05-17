import {createSelector} from 'reselect';

const getEventFilter = state => state.selectedEvent.eventFilter;
const getEvents = state => state.userEvents.eventCreations.data;

export const parseDateTime = datetime => {
  const date = datetime.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const time = datetime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} at ${time}`;
};

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
