import {Meteor} from 'meteor/meteor';
import yup from 'yup';

import db from './db';


db.notes.setSchema(yup.object({
  _id: yup.string().required(),
  title: yup.string(),
  body: yup.string(),
  userId: yup.string(),
  updatedAt: yup.date().default(() => new Date()),
}));

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return db.notes.find({userId: this.userId});
  });
}

Meteor.methods({
  'notes.insert'() {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    db.notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: new Date(),  //moment().valueOf(),  // new Date().getTime(),
    });
  },

  'notes.remove'(_id) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    db.notes.validate({_id});

    db.notes.remove({_id, userId: this.userId});
  },

  'notes.update'(_id, update) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    update = db.notes.validate({_id, ...update});  // default updateAt is assigned

    db.notes.update(
      {_id, userId: this.userId},
      {$set: {...update}}
    );
  }
});
