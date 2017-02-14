import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Newsletters } from './newsletters.js';

export const insert = new ValidatedMethod({
  name: 'newsletters.insert',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run({ name }) {
    const newsletter = {
      name,
      createdAt: new Date(),
    };

    Newsletters.insert(newsletter);
  },
});

// Get list of all method names on Newsletters
const TODOS_METHODS = _.pluck([
  insert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 newsletters operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TODOS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
