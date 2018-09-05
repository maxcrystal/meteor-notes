import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';


export const NoteList = props => (
  <div>
    <p>Note List {props.notes.length}</p>
    <NoteListHeader />
    {props.notes.map(note => (
      <NoteListItem key={note._id} note={note} /> 
    ))}
  </div>
);

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default withTracker(props => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch(),
  };
})(NoteList);
