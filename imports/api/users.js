import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import yup from 'yup';

import db from './db';


if (Meteor.isServer) {
  Accounts.validateNewUser(user => {
    const email = user.emails[0].address;
    const schema = yup.object({
      email: yup.string().email('It seems like you entered an invalid email').required(),
    });
    return db.validate({email}, schema);
  })
}
