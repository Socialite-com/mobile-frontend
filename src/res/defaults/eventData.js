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
  },
  {
    size: 'crew',
    private: true,
    paid: false,
    attendance: '25 to 50',
    backgroundColor: '#e28432',
    backgroundImage: 'default/crew.jpg',
    localImage: R.images.crew,
  },
  {
    size: 'company',
    private: true,
    paid: false,
    attendance: '50 to 100',
    backgroundColor: '#471d95',
    backgroundImage: 'default/society.jpg',
    localImage: R.images.society,
  },
  {
    size: 'society',
    private: false,
    paid: false,
    attendance: '100 or more',
    backgroundColor: '#000000',
    backgroundImage: 'default/party2.jpeg',
    localImage: R.images.party2,
  },
];

export default eventTypes;
