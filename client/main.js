import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import Routs from './../imports/routs/Routs.js';
import './../imports/startup/simpl-schema-config.js';

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  console.log(selectedNoteId);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(<Routs />, document.getElementById('app'));
});
