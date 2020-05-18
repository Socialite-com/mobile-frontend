import R from 'res/R';

const eventTypes = [
  {
    size: 'squad',
    private: true,
    paid: false,
    attendance: '25 or less',
    backgroundColor: '#407eb4',
    backgroundImage: 'default/alcohol.jpg',
    localImage: R.images.squad,
    todos: [
      {
        title: 'Set a location',
        completed: false,
        type: 2,
      },
      {
        title: 'Set a time',
        completed: false,
        type: 1,
      },
      {
        title: 'Invite people',
        completed: false,
        type: 3,
      },
    ],
  },
  {
    size: 'crew',
    private: true,
    paid: false,
    attendance: '25 to 50',
    backgroundColor: '#e28432',
    backgroundImage: 'default/crew.jpg',
    localImage: R.images.crew,
    todos: [
      {
        title: 'Set a location',
        completed: false,
        type: 2,
      },
      {
        title: 'Set a time',
        completed: false,
        type: 1,
      },
      {
        title: 'Invite people',
        completed: false,
        type: 3,
      },
      {
        title: 'Set a price',
        completed: false,
        type: 4,
      },
    ],
  },
  {
    size: 'company',
    private: true,
    paid: false,
    attendance: '50 to 100',
    backgroundColor: '#471d95',
    backgroundImage: 'default/society.jpg',
    localImage: R.images.society,
    todos: [
      {
        title: 'Set a location',
        completed: false,
        type: 2,
      },
      {
        title: 'Set a time',
        completed: false,
        type: 1,
      },
      {
        title: 'Invite people',
        completed: false,
        type: 3,
      },
      {
        title: 'Set a price',
        completed: false,
        type: 4,
      },
    ],
  },
  {
    size: 'society',
    private: false,
    paid: false,
    attendance: '100 or more',
    backgroundColor: '#000000',
    backgroundImage: 'default/party2.jpeg',
    localImage: R.images.party2,
    todos: [
      {
        title: 'Set a location',
        completed: false,
        type: 2,
      },
      {
        title: 'Set a time',
        completed: false,
        type: 1,
      },
      {
        title: 'Invite people',
        completed: false,
        type: 3,
      },
      {
        title: 'Set a price',
        completed: false,
        type: 4,
      },
    ],
  },
];

export default eventTypes;
