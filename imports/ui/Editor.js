import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { Notes } from './../api/notes';


export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
      });
    }
  }

  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({body});
    Meteor.call('notes.update', this.props.note._id, {body});
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title});
    Meteor.call('notes.update', this.props.note._id, {title}); 
  }

  handelDeleteNote() {
    Meteor.call('notes.remove', this.props.note._id);
    Session.set('selectedNoteId', undefined);
    this.props.history.push('/dashboard');
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <Input value={this.state.title} placeholder="Untitled" onChange={this.handleTitleChange.bind(this)} />
          <Input type="textarea" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
          <Button color="danger" onClick={this.handelDeleteNote.bind(this)}>Delete Note</Button>
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
})(withRouter(Editor));
