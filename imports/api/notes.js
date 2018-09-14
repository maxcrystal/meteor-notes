import {Meteor} from 'meteor/meteor';

import db from './db';


if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return db.notes.find({userId: this.userId});
  });
}

// Set client-side methods
Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const doc = db.notes.validate({ userId: this.userId }, 'insert');
    const noteId = db.notes.insert(doc);

    return noteId;
  },

  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const doc = db.notes.validate(
      {
        _id,
        userId: this.userId,
      },
      'remove',
      {strict: true}
    );

    db.notes.remove(doc);
  },

  'notes.update'(_id, update) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const doc = db.notes.validate({_id, ...update}, 'update');
    const updatedCount = db.notes.update(
      {_id, userId: this.userId},
      {$set: {...doc}}
    );

    return updatedCount;
  }
});
