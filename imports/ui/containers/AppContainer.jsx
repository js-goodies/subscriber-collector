import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import { Newsletters } from '../../api/newsletters/newsletters.js';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('newsletters');
  return {
    user: Meteor.user(),
    loading: !publicHandle.ready(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    lists: Newsletters.find({}).fetch(),
  };
}, App);
