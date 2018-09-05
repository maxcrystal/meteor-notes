import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';


export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({userId: this.userId});
  });
}

Meteor.methods({
  'notes.insert'() {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf(),  // new Date().getTime(),
    });
  },

  'notes.remove'(_id) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      noteId: {
        type: String,
        min: 1,
      },
    }).validate({noteId: _id});

    Notes.remove({ _id, userId: this.userId });
  },

  'notes.update'(_id, update) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      noteId: {
        type: String,
        min: 1,
      },
      title: {
        type: String,
        optional: true,
      },
      body: {
        type: String,
        optional: true,
      }
    }).validate({
      noteId: _id,
      ...update,
    });

    Notes.update({
        _id,
        userId: this.userId,
      }, {
        $set: {
          updatedAt: moment().valueOf(),
          ...update,
      }
    });
  }

});