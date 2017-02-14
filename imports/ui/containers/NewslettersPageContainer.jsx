import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Newsletters } from '../../api/newsletters/newsletters.js';
import NewslettersPage from '../pages/NewslettersPage.jsx';

const NewslettersPageContainer = createContainer(({ params: { id } }) => {
  return {
    newsletters: Newsletters.find({}).fetch(),
  };
}, NewslettersPage);

export default NewslettersPageContainer;
