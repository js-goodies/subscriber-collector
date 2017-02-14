import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Newsletters } from '../../api/newsletters/newsletters.js';
import UserMenu from '../components/UserMenu.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import { Link } from 'react-router';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    if (!loading && !children) {
      const list = Newsletters.findOne();
      this.context.router.replace(`/newsletters`);
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
    } = this.props;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div>
        <div className="ui inverted vertical navbar center aligned segment">
          <div className="ui container">
            <div className="ui large secondary inverted pointing menu">
              <a className="toc item">
                <i className="sidebar icon" />
              </a>

              <Link to="/newsletters" className="active item">
                {i18n.__('components.userMenu.newsletters')}
              </Link>

              <UserMenu user={user} logout={this.logout} />
            </div>
          </div>
        </div>

        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {loading
            ? <div>Loading</div>
            : clonedChildren}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
