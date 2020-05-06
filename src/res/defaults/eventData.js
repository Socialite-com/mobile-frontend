const eventTypes = [
  {
    size: 'squad',
    private: true,
    paid: false,
    attendance: '10 or less',
    backgroundColor: '#407eb4',
    backgroundImage: 'default/alcohol.jpg',
  },
  {
    size: 'crew',
    private: true,
    paid: false,
    attendance: '10 to 50',
    backgroundColor: '#e28432',
    backgroundImage: 'default/crew.jpg',
  },
  {
    size: 'company',
    private: true,
    paid: false,
    attendance: '50 to 100',
    backgroundColor: '#471d95',
    backgroundImage: 'default/society.jpg',
  },
  {
    size: 'society',
    private: false,
    paid: false,
    attendance: '100 or more',
    backgroundColor: '#000000',
    backgroundImage: 'default/party2.jpeg',
  },
];

export default eventTypes;
