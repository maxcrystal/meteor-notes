import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'reactstrap';


export const NoteListHeader = props => {
  return (
    <Button color="primary" onClick={() => props.meteorCall('notes.insert')}>Create Note</Button>
  );
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
}

export default withTracker(props => {
  return {
    meteorCall: Meteor.call,
  };
})(NoteListHeader);
