import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';


export const NoteListHeader = props => {
  return (
    <Button color="primary" onClick={() => props.meteorCall('notes.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedNoteId', res);
        props.history.push(`/dashboard/${res}`);
      }
    })}>Create Note</Button>
  );
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
}

export default withTracker(props => {
  return {
    meteorCall: Meteor.call,
    Session,
  };
})(withRouter(NoteListHeader));
