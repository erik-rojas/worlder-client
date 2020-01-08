import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../components/layouts";
import { message, DatePicker } from "antd";
import internalApi from "../config/internalApi";
import { updateAuth } from '../actions/auth';
import { updateLoading } from '../actions/loading';
import storage from '../config/storage';
import { FacebookButton } from '../components/register/FacebookButton';
import {
  FormFeedback,
} from "reactstrap";
import * as moment from 'moment'

import { EventItem } from '../components/layouts'

import '../assets/scss/login.scss'

const app_store_url = ''
const google_play_url = ''

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      form: {
        email: {
          value: "",
          isTouched: false
        },
        fullname: {
          value: "",
          isTouched: false
        },
        username: {
          value: "",
          isTouched: false
        },
        password: {
          value: "",
          isTouched: false
        },
        birthday: {
          value: moment(),
          isTouched: false
        },
      }
    };
  }

  componentWillMount() {
    const { match } = this.props

    if (match.type === 'login') this.setState({ isLogin: true })
    if (match.type === 'register') this.setState({ isLogin: false })
  }

  fbSignUp = (res) => {
    const { accessToken } = res
    if (accessToken) {
      internalApi
        .post("auth/register/facebook", { accessToken })
        .then(async res => {
          this.props.updateLoading(false);
          if (res.success) {
            message.success('Register successfully!');
            storage.set('token', res.data.token);
            this.props.updateAuth({
              token: res.data.token
            });
            this.props.history.push('/');
          } else {
            message.error(res.message ? res.message : '');
            this.setState({
              step: 1
            });
            this.props.updateLoading(false);
          }
        })
        .catch(err => {
          console.log('err = ', err);
          message.error(err.response.data ? err.response.data.message : '');
          this.props.updateLoading(false);
        });
    }
  }

  fbLogin = (res) => {
    const { accessToken } = res
    if (accessToken) {
      internalApi
        .post("auth/loginWithFacebook", { accessToken })
        .then(async res => {
          this.props.updateLoading(false);
          if (res.success) {
            message.success('Login successfully!');
            storage.set('token', res.data.token);
            this.props.updateAuth({
              token: res.data.token
            });
            this.props.history.push('/');
          } else {
            message.error(res.message ? res.message : 'Login fail, please try again!!');
          }
        })
        .catch(err => {
          message.error(err.response.data ? err.response.data.message : 'Login fail, please try again!!');
          console.log(err);
          this.props.updateLoading(false);
        });
    }
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    let isError = false;
    let form = this.state.form;
    const fields = [
      "email",
      "password",
    ];

    for (let i = 0; i < fields.length; i++) {
      form[fields[i]].isTouched = true;

      if (form[fields[i]].value === null || form[fields[i]].value.length < 1) {
        isError = true;
      }
    }
    this.setState({ form });

    if (isError) {
      return;
    }

    // check login info type
    let key = '';
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    key = this.state.form.email.value.match(mailFormat) ? 'email' : 'username'
    const userData = {
      [key]: this.state.form.email.value,
      password: this.state.form.password.value,
    };

    this.props.updateLoading(true);
    internalApi.post('auth/login', userData).then(res => {
      this.props.updateLoading(false);
      if (res.success) {
        message.success('Login successfully!');
        storage.set('token', res.data.token);
        this.props.updateAuth({
          token: res.data.token
        });
        this.props.history.push("/");
      } else {
        message.error(res.message ? res.message : 'Login fail, please try again!!');
      }
    }).catch(err => {
      message.error((err.response && err.response) ? err.response.data.message : 'Login fail, please try again!!');
      this.props.updateLoading(false);
    })
  }

  onChangeValue = (field, value) => {
    let form = this.state.form;
    form[field].value = value;
    this.setState({ form });
  }

  onTouched = field => {
    let form = this.state.form
    form[field].isTouched = true
    this.setState({
      form
    })
  }

  checkValidate = (field, isDate = false) => {
    if (field.isTouched) {
      if (isDate) {
        if (field.value == null) return true
        return false
      }
      if (field.value.length > 0) {
        return false
      }
      return true
    }
    return false
  }

  onSubmitSignup = (e) => {
    e.preventDefault();
    let isError = false;
    let form = this.state.form;
    const fields = [
        "fullname",
        "username",
        "birthday",
        "email",
        "password"
    ];

    for (let i = 0; i < fields.length; i++) {
        form[fields[i]].isTouched = true;

        if (form[fields[i]].value === null || form[fields[i]].value.length < 1) {
            isError = true;
        }
    }
    this.setState({ form });

    if (!form.password.value.length) {
        this.setState({
            checkPassword: true,
        })
        isError = true;
    }
    if (isError) {
        return;
    }
    let datas = {};
    for (let i = 0; i < fields.length; i++) {
        datas[fields[i]] = this.state.form[fields[i]].value;
    }

    datas["birthday"] = this.state.form.birthday.value.format('YYYY-MM-DD');
    this.props.updateLoading(true);
    internalApi
      .post("auth/register/seeker", datas)
      .then(async res => {
          this.props.updateLoading(false);
          if (res.success) {
              message.success('Register successfully!');
              this.props.history.push('/user/login');
          } else {
              message.error(res.message ? res.message : '');
              this.setState({
                  step: 1
              });
              this.props.updateLoading(false);
          }
      })
      .catch(err => {
          message.error(err.response.data ? err.response.data.message : '');
          console.log(err);
          this.props.updateLoading(false);
      });
  }

  render() {
    const { isLogin } = this.state
    const event_list = [
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      }
    ]
    const app_store_img_url = require('../assets/img/app_store.png')
    const google_play_img_url = require('../assets/img/google_play.png')

    return (
      <div className="wrapper">
        <Header bSearchShow={false} />
        <div className="contents-main" id="contents-main">
          <div className="justify-content-center main-container col-md-11">
            {/* <div className="container-popular">
              <div className="container-title">Popular now</div>
              <div className="container-content">
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
              </div>
            </div> */}
            <div className="login-form-section">
              {isLogin && <div className="form-section">
                <svg>
                  <linearGradient spreadMethod="pad" id="LinearGradientFill-login" x1="0.5" x2="0.5" y1="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#290f0f" stopOpacity="1"></stop>
                  </linearGradient>
                  <rect className="rect-login-section" rx="10" ry="10" x="0" y="0" width="385" height="520" />
                </svg>
                <div className="form-section-content">
                  <form
                    onSubmit={this.onSubmitLogin}
                    method="post"
                    className="form-box"
                  >
                    <div className="fb-btn-loader col-md-10">
                      <FacebookButton
                        fbClick={this.fbClick}
                        fbResponse={this.fbLogin}
                        buttonText={"Login With Facebook"}
                      />
                    </div>
                    <div className="form-splitter"> OR </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Username or Email"
                          name="userinfo"
                          value={this.state.form.email.value}
                          onChange={e =>
                            this.onChangeValue("email", e.target.value)
                          }
                          onBlur={() => this.onTouched("email")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.email.value.length <= 0 && this.state.form.email.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Email is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.form.password.value}
                          onChange={e =>
                            this.onChangeValue("password", e.target.value)
                          }
                          onBlur={() => this.onTouched("password")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.password.value.length <= 0 && this.state.form.password.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Password is required!</FormFeedback>
                    </div>
                    <div className="form-button">
                      <svg>
                        <linearGradient spreadMethod="pad" id="LinearGradientFill-form-button" x1="0.5" x2="0.5" y1="0" y2="1">
                          <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                          <stop offset="1" stopColor="#3b132f" stopOpacity="1"></stop>
                        </linearGradient>
                        <rect className="rect-form-button" rx="8" ry="8" x="0" y="0" width="276" height="45" />
                      </svg>
                      <button
                        type="submit"
                        name="btn_submit"
                        className="iwj-btn-primary iwj-btn-full iwj-btn-large"
                      >
                        Log in
                      </button>
                    </div>
                    <div className="text-center lost-password">
                      <a href="">Forgot password ?</a>
                    </div>
                    <div className="text-center register-account">
                      Not have account yet ? <span onClick={() => this.setState({ isLogin: false })}>Sign up</span>
                    </div>
                  </form>
                </div>
              </div>}
              {!isLogin && <div className="form-section">
                <svg>
                  <linearGradient spreadMethod="pad" id="LinearGradientFill-login" x1="0.5" x2="0.5" y1="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#290f0f" stopOpacity="1"></stop>
                  </linearGradient>
                  <rect className="rect-login-section" rx="10" ry="10" x="0" y="0" width="385" height="520" />
                </svg>
                <div className="form-section-content">
                  <div className="desc">Sign up free and enjoy your experience.</div>
                  <form
                    onSubmit={this.onSubmitSignup}
                    method="post"
                    className="form-box"
                  >
                    <div className="fb-btn-loader col-md-10">
                      <FacebookButton
                        fbClick={this.fbClick}
                        fbResponse={this.fbSignUp}
                        buttonText={"Signup With Facebook"}
                      />
                    </div>
                    <div className="form-splitter"> OR </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Username or Email"
                          name="userinfo"
                          value={this.state.form.email.value}
                          onChange={e =>
                            this.onChangeValue("email", e.target.value)
                          }
                          onBlur={() => this.onTouched("email")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.email.value.length <= 0 && this.state.form.email.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Email is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Full name"
                          name="fullname"
                          value={this.state.form.fullname.value}
                          onChange={e =>
                            this.onChangeValue("fullname", e.target.value)
                          }
                          onBlur={() => this.onTouched("fullname")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.fullname.value.length <= 0 && this.state.form.fullname.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Full name is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Username"
                          name="username"
                          value={this.state.form.username.value}
                          onChange={e =>
                            this.onChangeValue("username", e.target.value)
                          }
                          onBlur={() => this.onTouched("username")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.username.value.length <= 0 && this.state.form.username.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Username is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.form.password.value}
                          onChange={e =>
                            this.onChangeValue("password", e.target.value)
                          }
                          onBlur={() => this.onTouched("password")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.password.value.length <= 0 && this.state.form.password.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Password is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <DatePicker
                          allowClear={false}
                          className={`${this.checkValidate(this.state.form.birthday, true) ? 'is-invalid' : ''}`}
                          value={this.state.form.birthday.value}
                          placeholder="Date of birth"
                          onChange={(date) => this.onChangeValue("birthday", date)}
                          onBlur={() => this.onTouched("birthday")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.birthday.value.length <= 0 && this.state.form.birthday.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Date of birth is required!</FormFeedback>
                    </div>
                    <div className="form-button">
                      <svg>
                        <linearGradient spreadMethod="pad" id="LinearGradientFill-form-button" x1="0.5" x2="0.5" y1="0" y2="1">
                          <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                          <stop offset="1" stopColor="#3b132f" stopOpacity="1"></stop>
                        </linearGradient>
                        <rect className="rect-form-button" rx="8" ry="8" x="0" y="0" width="276" height="45" />
                      </svg>
                      <button
                        type="submit"
                        name="btn_submit"
                        className="iwj-btn-primary iwj-btn-full iwj-btn-large"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="text-center register-account">
                      Have an account? <span onClick={() => this.setState({ isLogin: true })}>Log in</span>
                    </div>
                  </form>
                </div>
              </div>}
              <div className="get-the-app">
                <svg>
                  <linearGradient spreadMethod="pad" id="LinearGradientFill-get-the-app" x1="0.5" x2="0.5" y1="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                    <stop offset="0.7614539861679077" stopColor="#2a2828" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#373535" stopOpacity="1"></stop>
                  </linearGradient>
                  <rect className="rect-get-the-app" rx="0" ry="0" x="0" y="0" width="385" height="90" />
                </svg>
                <div className="get-the-app-text">Get the app</div>
                <div className="app-stores">
                  <a href="" style={{ marginRight: 5 }}>
                    <svg className="app-store-svg">
                      <pattern id="app-store-pattern" x="0" y="0" width="100%" height="100%">
                        <img src={app_store_img_url} alt="app store" />
                      </pattern>
                      <rect className="rect-app-store" rx="4" ry="4" x="0" y="0" width="123" height="35" />
                    </svg>
                    <img src={app_store_img_url} className="app-store-img" alt="app store" />
                  </a>
                  <a href="">
                    <svg className="app-store-svg">
                      <pattern id="app-store-pattern" x="0" y="0" width="100%" height="100%">
                        <img src={google_play_img_url} alt="google-play" />
                      </pattern>
                      <rect className="rect-app-store" rx="4" ry="4" x="0" y="0" width="123" height="35" />
                    </svg>
                    <img src={google_play_img_url} className="app-store-img" alt="app store" />
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="container-trending">
              <div className="container-title">Trending now</div>
              <div className="container-content">
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
                <EventItem
                  imgUrl={require('../assets/images/event/event1.png')}
                  eventDate={'SEP 11'}
                  eventInfo={event_list[0]}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToprops = {
  updateLoading,
  updateAuth
}


export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Login);
