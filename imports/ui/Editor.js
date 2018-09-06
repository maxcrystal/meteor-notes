import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';

import { Notes } from './../api/notes';


export class Editor extends React.Component {

  handleBodyChange(e) {
    Meteor.call('notes.update', this.props.note._id, {
      body: e.target.value,
    });
  }

  handleTitleChange(e) {
    Meteor.call('notes.update', this.props.note._id, {
      title: e.target.value,
    }); 
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <Input value={this.props.note.title} placeholder="Untitled" onChange={this.handleTitleChange.bind(this)} />
          <Input type="textarea" value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
          <Button color="danger">Delete Note</Button>
        </div>
      );
    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note not found' : 'Pick a note to get started'}
        </p>
      );
    }
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
}

export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId, 
    note: Notes.findOne(selectedNoteId),
  };
})(Editor);
