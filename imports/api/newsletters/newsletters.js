import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import faker from 'faker';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class NewslettersCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Newsletters = new NewslettersCollection('newsletters');

Newsletters.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Newsletters.schema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
});

Newsletters.attachSchema(Newsletters.schema);

Newsletters.publicFields = {
  name: 1,
  createdAt: 1,
};

Factory.define('newsletter', Newsletters, {
  name: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

Newsletters.helpers({
});
