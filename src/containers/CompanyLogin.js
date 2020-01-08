import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../components/layouts";
import { message } from "antd";
import internalApi from "../config/internalApi";
import { updateAuth } from '../actions/auth';
import { updateLoading } from '../actions/loading';
import storage from '../config/storage';
import {
  FormFeedback,
} from "reactstrap";

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
        companyname: {
          value: "",
          isTouched: false
        },
        vatnumber: {
          value: "",
          isTouched: false
        },
        country: {
          value: "",
          isTouched: false
        },
        city: {
          value: "",
          isTouched: false
        },
        address: {
          value: "",
          isTouched: false
        },
        postalcode: {
          value: "",
          isTouched: false
        },
        phone: {
          value: "",
          isTouched: false
        },
        password: {
          value: "",
          isTouched: false
        }
      }
    };
  }

  componentWillMount() {
    const { match } = this.props

    if (match.type === 'login') this.setState({ isLogin: true })
    if (match.type === 'register') this.setState({ isLogin: false })
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    let isError = false;
    let form = this.state.form;
    const fields = [
      "email",
      "password",
      "phone"
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

    const companyData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      phone: this.state.form.phone.value
    };

    this.props.updateLoading(true);
    internalApi.post('auth/login/company', companyData).then(res => {
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
    let form = this.state.form;
    form[field].isTouched = true;
    this.setState({
      form
    });
  };

  checkValidate = (field, isDate = false) => {
    if (field.isTouched) {
      if (isDate) {
        if (field.value == null) return true;
        return false;
      }
      if (field.value.length > 0) {
        return false;
      }
      return true;
    }
    return false;
  };

  onSubmitSignup = (e) => {
    e.preventDefault();
    let isError = false;
    let form = this.state.form;
    let datas = {};
    const fields = [
      "email",
      "fullname",
      "companyname",
      "vatnumber",
      "phone",
      "postalcode",
      "password",
      "city",
      "country",
      "address"
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

    for (let i = 0; i < fields.length; i++) {
      datas[fields[i]] = this.state.form[fields[i]].value;
    } 
    this.props.updateLoading(true);
    internalApi
      .post("auth/register/company", datas)
      .then(async res => {
        this.props.updateLoading(false);
        if (res.success) {
          message.success('Register successfully!');
          this.props.history.push('/company/login');
        } else {
          message.error(res.message ? res.message : '');
          this.props.updateLoading(false);
        }
      })
      .catch(err => {
        message.error(err.response.data ? err.response.data.message : '');
        this.props.updateLoading(false);
      });
  }

  render() {
    const { isLogin } = this.state
    const app_store_img_url = require('../assets/img/app_store.png')
    const google_play_img_url = require('../assets/img/google_play.png')

    return (
      <div className="wrapper">
        <Header bSearchShow={false} />
        <div className="contents-main" id="contents-main">
          <div className="justify-content-center main-container col-md-11">
            <div className="login-form-section">
              { isLogin && <div className="form-section">
                <div className="form-title">Company Login</div>
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
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Phone number"
                          name="phone"
                          type="phone"
                          value={this.state.form.phone.value}
                          onChange={e =>
                              this.onChangeValue("phone", e.target.value)
                          }
                          onBlur={() => this.onTouched("phone")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.phone.value.length <= 0 && this.state.form.phone.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Phone is required!</FormFeedback>
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
              </div> }
              { !isLogin && <div className="form-section" style={{height: 800, marginTop: 250}}>
                <div className="form-title">Company Signup</div>
                <svg style={{height: 800}}>
                  <linearGradient spreadMethod="pad" id="LinearGradientFill-login" x1="0.5" x2="0.5" y1="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#290f0f" stopOpacity="1"></stop>
                  </linearGradient>
                  <rect className="rect-login-section" rx="10" ry="10" x="0" y="0" width="385" height="800" />
                </svg>
                <div className="form-section-content">
                  <form
                    onSubmit={this.onSubmitSignup}
                    method="post"
                    className="form-box"
                  >
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Email"
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
                          placeholder="Company name"
                          name="companyname"
                          value={this.state.form.companyname.value}
                          onChange={e =>
                              this.onChangeValue("companyname", e.target.value)
                          }
                          onBlur={() => this.onTouched("companyname")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.companyname.value.length <= 0 && this.state.form.companyname.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Company name is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="VAT number"
                          name="vatnumber"
                          value={this.state.form.vatnumber.value}
                          onChange={e =>
                              this.onChangeValue("vatnumber", e.target.value)
                          }
                          onBlur={() => this.onTouched("vatnumber")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.vatnumber.value.length <= 0 && this.state.form.vatnumber.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >VAT number is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Country"
                          name="country"
                          value={this.state.form.country.value}
                          onChange={e =>
                              this.onChangeValue("country", e.target.value)
                          }
                          onBlur={() => this.onTouched("country")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.country.value.length <= 0 && this.state.form.country.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Country is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="City"
                          name="city"
                          value={this.state.form.city.value}
                          onChange={e =>
                              this.onChangeValue("city", e.target.value)
                          }
                          onBlur={() => this.onTouched("city")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.city.value.length <= 0 && this.state.form.city.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >City is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Address"
                          name="address"
                          value={this.state.form.address.value}
                          onChange={e =>
                              this.onChangeValue("address", e.target.value)
                          }
                          onBlur={() => this.onTouched("address")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.address.value.length <= 0 && this.state.form.address.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Address is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Postal code"
                          name="postalcode"
                          value={this.state.form.postalcode.value}
                          onChange={e =>
                              this.onChangeValue("postalcode", e.target.value)
                          }
                          onBlur={() => this.onTouched("postalcode")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.postalcode.value.length <= 0 && this.state.form.postalcode.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Postal code is required!</FormFeedback>
                    </div>
                    <div className="form-field">
                      <div className="form-input">
                        <svg>
                          <rect className="rect-form-input" rx="8" ry="8" x="0" y="0" width="288" height="34" />
                        </svg>
                        <input
                          className="input-item"
                          placeholder="Phone number"
                          name="phone"
                          value={this.state.form.phone.value}
                          onChange={e =>
                              this.onChangeValue("phone", e.target.value)
                          }
                          onBlur={() => this.onTouched("phone")}
                        />
                      </div>
                      <FormFeedback style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.form.phone.value.length <= 0 && this.state.form.phone.isTouched ? 'red' : 'transparent',
                        height: 20
                      }} >Phone number is required!</FormFeedback>
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
                        Sign up
                      </button>
                    </div>
                    <div className="text-center register-account">
                      Have an account? <span onClick={() => this.setState({ isLogin: true })}>Log in</span>
                    </div>
                  </form>
                </div>
              </div> }
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
