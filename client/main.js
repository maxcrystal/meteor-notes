import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
// import {Tracker} from 'meteor/tracker';

import Routs from './../imports/routs/Routs.js';
import './../imports/startup/simpl-schema-config.js';

Meteor.startup(() => {
  ReactDOM.render(<Routs />, document.getElementById('app'));
});
