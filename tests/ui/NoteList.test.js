import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { NoteList } from './../../imports/ui/NoteList';


const notes = [
  {
    _id: 'Note1_id',
    title: 'Note 1',
    body: '',
    updatedAt: 0, 
  }, {
    _id: 'Note2_id',
    title: '',
    body: 'Body 2',
    updatedAt: 0,
  }
];

if (Meteor.isClient) {

  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);
      wrapper.find('NoteListItem').length.should.be.eql(2);
      wrapper.find('NoteListEmptyItem').length.should.be.eql(0);
    });

    it('should render NoteListEmptyItem if no notes', function() {
      const wrapper = mount(<NoteList notes={[]} />);
      wrapper.find('NoteListItem').length.should.be.eql(0);
      wrapper.find('NoteListEmptyItem').length.should.be.eql(1);
    });

  });
}
