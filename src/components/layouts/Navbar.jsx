import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAuth } from '../../actions/auth';

import '../../assets/scss/navbar.scss'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isShowProfile: false,
      user_role: ''
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  checkEntertainer = () => {
    return this.props.history.location.pathname.indexOf('entertainer') < 0 && this.props.history.location.pathname.indexOf('financials') < 0 && this.props.history.location.pathname.indexOf('setup') < 0 && this.props.history.location.pathname.indexOf('gigzoo-guarantee') < 0 && this.props.history.location.pathname.indexOf('help') < 0;
  }


  isLogin = () => {
    const { auth } = this.props
    if (auth.user_id && auth.user_id._id && auth.user_id._id.length > 0) {
      return 'seeker'
    } else if (auth.companyname) {
      return 'company'
    }
    return '';
  }

  isCompany = () => {
    return this.props.auth.user_id.role === "company";
  };


  onClickLogout = (e) => {
    this.props.logoutAuth();
  }

  showProfile = () => {
    this.setState({
      isShowProfile: !this.state.isShowProfile,
    })
  }

  render() {

    const guestLinks = (
      <div className="nav-btn-section">
        <Link className="nav-organize register active" to="/organize">
          <svg>
            <linearGradient spreadMethod="pad" id="LinearGradientFill-nav-btn" x1="0.5" x2="0.5" y1="-0.12195292115211487" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
              <stop offset="0.5249999761581421" stopColor="#4e4b4e" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#070000" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#100c0b" stopOpacity="1"></stop>
            </linearGradient>
            <rect className="rect-nav-organize" rx="6" ry="6" x="0" y="0" width="115.027" height="34.999" />
          </svg>
          <div className="nav-btn-text">Organize</div>
        </Link>
        <Link className="nav-help register active" to="/help">
          <svg>
            <linearGradient spreadMethod="pad" id="LinearGradientFill-nav-btn" x1="0.5" x2="0.5" y1="-0.12195292115211487" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
              <stop offset="0.5249999761581421" stopColor="#4e4b4e" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#070000" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#100c0b" stopOpacity="1"></stop>
            </linearGradient>
            <rect className="rect-nav-help" rx="6" ry="6" x="0" y="0" width="75" height="34.999" />
          </svg>
          <div className="nav-btn-text">Help</div>
        </Link>
        <Link className="nav-user-login register active" to="/user/login">
          <svg>
            <linearGradient spreadMethod="pad" id="LinearGradientFill-nav-btn" x1="0.5" x2="0.5" y1="-0.12195292115211487" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
              <stop offset="0.5249999761581421" stopColor="#4e4b4e" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#070000" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#100c0b" stopOpacity="1"></stop>
            </linearGradient>
            <rect className="rect-nav-user-login" rx="6" ry="6" x="0" y="0" width="145" height="34.999" />
          </svg>
          <div className="nav-btn-text">User? log in!</div>
        </Link>
        <Link className="nav-company-login register active" to="/company/login">
          <svg>
            <linearGradient spreadMethod="pad" id="LinearGradientFill-nav-btn" x1="0.5" x2="0.5" y1="-0.12195292115211487" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
              <stop offset="0.5249999761581421" stopColor="#4e4b4e" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#070000" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#100c0b" stopOpacity="1"></stop>
            </linearGradient>
            <rect className="rect-nav-company-login" rx="6" ry="6" x="0" y="0" width="185" height="34.999" />
          </svg>
          <div className="nav-btn-text">Company? log in!</div>
        </Link>
      </div>
    );

    return (
      <div className="iw-top-bar-wrapper">
        <div className="col-md-7 col-sm-8 col-xs-10">
          <div className="top-bar-left">
            <svg>
              <linearGradient spreadMethod="pad" id="LinearGradientFill6" x1="0.6225573420524597" x2="0.5" y1="0.5" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="1"></stop>
                <stop offset="0.745753288269043" stopColor="#2e3747" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#040404" stopOpacity="1"></stop>
              </linearGradient>
              <rect className="rect-logo-title" rx="7" ry="7" x="0" y="0" width="140" height="28" />
            </svg>
            <Link className="logo-title" to="/">worldsty</Link>
          </div>
        </div>
        <div className="col-md-5 col-sm-4 col-xs-2">
          <div className="top-bar-right">

            <div className="register-login">
              {
                !this.isLogin() && guestLinks
              }

              {
                this.isLogin() && (
                  <div>
                    <span className="profile_user">
                      <Link onClick={this.showProfile} className="register active" id="detail_user" to="#" title="Quản lý hồ sơ">
                        {this.isLogin() === 'seeker' && this.props.auth.user_id.username}
                        {this.isLogin() === 'company' && this.props.auth.companyname}
                      </Link>
                      <ul className="dropdown-menu" style={{ display: this.state.isShowProfile ? 'block' : "none" }}>
                        <li>
                          <Link onClick={this.showProfile} to="/dashboard">
                            <i className="ion-ios-contact" />Account
                          </Link>
                        </li>
                        <li>
                          <Link onClick={this.showProfile} to="/dashboard/change-password">
                            <i className="fa fa-key" aria-hidden="true" />Change password
                      </Link>
                        </li>
                      </ul>
                    </span>
                    <Link onClick={this.onClickLogout} className="login" to="/">Log out</Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutAuth: () => {
      dispatch(logoutAuth());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
