/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Newsletters } from '../newsletters.js';

Meteor.publish('newsletters', function newsletters() {
  const userId = this.userId;

  return Newsletters.find({});
});
