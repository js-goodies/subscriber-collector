import { Meteor } from 'meteor/meteor';
import { Newsletters } from '../../api/newsletters/newsletters.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Newsletters.find().count() === 0) {
    const data = [
      {
        name: 'JS Goodies',
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((newsletter) => {
      const newsletterId = Newsletters.insert({
        name: newsletter.name,
      });
    });
  }
});
