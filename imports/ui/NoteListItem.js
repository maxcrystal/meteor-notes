import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


const NoteListItem = props => (
  <div>
    <h5>{props.note.title || 'Untitled'}</h5>
    <p>{moment(props.note.updatedAt).format('D.MM.Y')}</p>
  </div>
);

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
}

export default NoteListItem;