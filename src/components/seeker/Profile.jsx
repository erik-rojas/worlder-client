import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { _url, _urlServer } from "../../config/utils";
import { connect } from "react-redux";

import { updateAuth } from "../../actions/auth";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
    };
  }

  componentWillMount() {
  }

  renderAvatar = () => {
    if (this.props.auth.user_id) {
      if (this.props.auth.user_id.avatar && this.props.auth.user_id.avatar.length > 0) {
        if (this.props.auth.user_id.avatar.indexOf('http://') > -1 || this.props.auth.user_id.avatar.indexOf('https://') > -1) {
          return <img alt="profile" className="avatar avatar-96 photo" src={this.props.auth.user_id.avatar} />;
        }
        return <img alt="profile" className="avatar avatar-96 photo" src={_urlServer(this.props.auth.user_id.avatar)} />;
      } else {
        return <img alt="profile" className="avatar avatar-96 photo" src={_url('assets/images/no_picture.png')} />;
      }
    } else {
      return null;
    }
  }

  render() {
    const { user_id } = this.props.auth
    return (
      <div className="iwj-dashboard-main-inner">
        <div className="iwj-overview iwj-profile clearfix">
          <div className="info-top-wrap">
            <div className="sidebar-info">
              <div className="avatar">
               {this.renderAvatar()}
              </div>
            </div>
            <div className="main-info candidate-info iw-job-detail-sidebar">
              <div className="info-top"><h3 className="iwj-title"><a href="">{user_id.name}</a></h3>
                <div className="headline">User
              </div>
              </div>
              <div className="iwj-sidebar-bottom info-bottom">
                <ul>
                  <li className="email">
                    <div className="left theme-color"> <i className="iwj-icon-email" /> <span className="title-meta">Name:</span>
                    </div>
                    <div className="content"><Link to="#">{user_id.fullname}</Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="iwj-sidebar-bottom info-bottom">
                <ul>
                  <li className="email">
                    <div className="left theme-color"> <i className="iwj-icon-email" /> <span className="title-meta">Email:</span>
                    </div>
                    <div className="content"><Link to="#">{user_id.email}</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="iwj-candicate-detail iw-profile-content">
            <div className="candicate-main-content">
              <div className="resume-detail-info">
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: data => {
      dispatch(updateAuth(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
