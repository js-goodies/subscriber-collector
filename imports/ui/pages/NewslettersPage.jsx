import React from 'react';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default class NewslettersPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { editingTodo: null });
  }

  renderNewsletters() {
    const { newsletters } = this.props;

    return newsletters.map(newsletter => (
      <div key={newsletter._id}>
        <div className="ui toggle inverted checkbox">
          <input type="checkbox" name="public" />
          <label>{newsletter.name}</label>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="newsletters-page">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">
              Newsletters
            </h1>
            <h2>Avoid SPAM and centralize all your newsletters</h2>
          </div>
        </div>
        <div className="ui vertical segment page-content">
          <div className="ui content container">
            <h2 className="ui header">
              <i className="settings icon" />
              <div className="content">
                Hacker Goodies
                <div className="sub header">
                  Curated list of newsletters for hackers
                </div>
              </div>
            </h2>

            {this.renderNewsletters()}
          </div>
        </div>
      </div>
    );
  }
}

NewslettersPage.propTypes = {
  newsletters: React.PropTypes.array,
};
