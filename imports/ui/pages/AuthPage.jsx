import React from 'react';

// a common layout wrapper for auth pages
const AuthPage = ({ content, link }) => (
  <div className="ui middle aligned center aligned grid">
    <div className="column">
      <div className="page auth">
        <div className="content-scrollable">
          {content}
          {link}
        </div>
      </div>
    </div>
  </div>
);

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;
