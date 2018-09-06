import { Session } from 'meteor/session'; 
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import moment from 'moment';


export const NoteListItem = props => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
      props.history.replace(`/dashboard/${props.note._id}`);
    }}>
      <h5>{props.note.title || 'Untitled'}</h5>
      {props.note.selected ? 'selected' : undefined}
      <p>{moment(props.note.updatedAt).format('D.MM.Y')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
};

export default withTracker(props => {
  return { Session };
})(NoteListItem);