const actions = {
  edit: [{label: 'Edit', backgroundColor: '#413aad', action: 'edit'}],
  share: [{label: 'Share', backgroundColor: '#ba3a9a', action: 'share'}],
  cancel: [{label: 'Cancel', backgroundColor: '#db4a4a', action: 'cancel'}],
  save: [{label: 'Save', backgroundColor: '#51a327', action: 'save'}],
  ticket: [{label: 'My Ticket', backgroundColor: '#000000', action: 'ticket'}],

  // responses to event
  unknown: [{label: 'Respond', backgroundColor: '#efa208', action: 'respond'}],
  confirmed: [{label: 'Going', backgroundColor: '#51a327', action: 'respond'}],
  declined: [
    {label: 'Declined', backgroundColor: '#db4a4a', action: 'respond'},
  ],
};

export default actions;
