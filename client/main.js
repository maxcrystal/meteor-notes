import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
// import {Tracker} from 'meteor/tracker';

import renderRouts from './../imports/routs/routs.js';
import './../imports/startup/simpl-schema-config.js';

Meteor.startup(() => {
  ReactDOM.render(renderRouts(), document.getElementById('app'));
});
