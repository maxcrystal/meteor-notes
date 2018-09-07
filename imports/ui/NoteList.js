import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export class NoteList extends React.Component {
  componentDidMount() {
    Session.set('selectedNoteId', this.props.match.params.id);
  }

  render() {
    return (
      <Container className="page-content__sidebar border rounded mr-3">
        <NoteListHeader />
        {this.props.notes.length ? undefined : <NoteListEmptyItem />}
        {this.props.notes.map(note => (
          <NoteListItem key={note._id} note={note} history={this.props.history}/> 
        ))}
      </Container>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map(note => {
      return {
        ...note,
        selected: note._id === selectedNoteId,
      };
    }),
  };
})(withRouter(NoteList)); 
