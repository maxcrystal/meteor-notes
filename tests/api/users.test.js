import { Meteor } from 'meteor/meteor';
import should from 'should';

import { validateNewUser } from './../../imports/api/users';


if (Meteor.isServer) {
  describe('users', function() {
    it('should allow valid email', function(done) {
      const testUser = {
        emails: [
          {
            address: 'test@example.com',
          },
        ]
      };
      const res = validateNewUser(testUser);

      res.should.be.ok;
      done();
    });

    it('should reject invalid email', function(done) {
      (() => {
        const testUser = {
          emails: [
            {
              address: 'testexamplecom',
            },
          ]
        };      
        validateNewUser(testUser);
      }).should.throw();
      done();
    })
  });
}
