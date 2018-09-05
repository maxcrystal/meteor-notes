import { Meteor } from 'meteor/meteor';
import should from 'should';

import { Notes } from './../../imports/api/notes';


if (Meteor.isServer) {
  describe('notes', function() {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'Title 1',
      body: 'Body 2',
      updatedAt: 0,
      userId: 'testUserId1',
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Title 2',
      body: 'Body 2',
      updatedAt: 0,
      userId: 'testUserId2',
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    afterEach(function() {
      Notes.remove({});
    });

    it('should insert new note', function(done) {
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: noteOne.userId})

      Notes.findOne({_id, userId: noteOne.userId}).should.be.ok;
      done();
    });

    it('should not insert note if not authenticated', function(done) {
      (() => {
        Meteor.server.method_handlers['notes.insert']();
      }).should.throw();
      done();
    });

    it('should remove note', function(done) {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);  // the second arg is a list of args to pass to function
      (Notes.findOne({_id: noteOne.noteId}) === null).should.be.ok;
      done(); 
    });

    it('should not remove if not authenticated', function(done) {
      (() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);  // the second arg is a list of args to pass to function
      }).should.throw();
      done(); 
    });

    it('should not remove note if invalid id', function(done) {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [`invalid ${noteOne._id}`]);  // the second arg is a list of args to pass to function
      Notes.findOne({_id: noteOne._id}).should.be.ok;
      done(); 
    });

    it('should update note', function(done) {
      const title = 'New Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      }, [
        noteOne._id,
        {title},
      ]);
      const note = Notes.findOne(noteOne._id);
      note.updatedAt.should.be.above(0);
      note.should.containDeep({
        title,
        body: noteOne.body,
      });
      done();
    });

    it('should throw if extra paramters are set to be updated', function(done) {
      (() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId,
        }, [
          noteOne._id,
          {text: "New body"},
        ]);
      }).should.throw();
      done();
    });

    it('should not update note if user was not creator', function(done) {
      const title = 'New Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: `invalid ${noteOne.userId}`,
      }, [
        noteOne._id,
        {title},
      ]);
      const note = Notes.findOne(noteOne._id);
      note.should.containEql(noteOne);
      done();
    });

    it('should not update if not authenticated', function(done) {
      (() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);  // the second arg is a list of args to pass to function
      }).should.throw();
      done(); 
    });

    it('should not update note if invalid id', function(done) {
      Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [`invalid ${noteOne._id}`]);  // the second arg is a list of args to pass to function
      Notes.findOne({_id: noteOne._id}).should.be.ok;
      done(); 
    });

    it('should return user notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      notes.length.should.equal(1);
      notes[0].should.eql(noteOne);
    });

    it('should not return note if user have none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: `invalid ${noteOne.userId}`});
      const notes = res.fetch();
      notes.length.should.equal(0);
    });

  });
}




