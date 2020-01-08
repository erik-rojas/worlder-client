import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    FormFeedback,
} from "reactstrap";
import { message, DatePicker } from "antd";
import storage from '../../config/storage';
import internalApi from "../../config/internalApi";
import { updateAuth } from '../../actions/auth';
import { updateLoading } from '../../actions/loading';
import { FacebookButton } from './FacebookButton';
import Geosuggest from "react-geosuggest";
import * as moment from 'moment';
class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                fullname: {
                    value: "",
                    isTouched: false
                },
                username: {
                    value: "",
                    isTouched: false
                },
                description: {
                    value: "",
                    isTouched: false
                },
                birthday: {
                    value: moment(),
                    isTouched: false
                },
                email: {
                    value: "",
                    isTouched: false
                },
                password: {
                    value: "",
                    isTouched: false
                },
                re_password: {
                    value: "",
                    isTouched: false
                },
                phone: {
                    value: "",
                    isTouched: false
                },
                address: {
                    value: "",
                    isTouched: false
                },
                city: {
                    value: "",
                    isTouched: false
                },
                country: {
                    value: "",
                    isTouched: false
                },
                lat: {
                    value: null,
                    isTouched: false
                },
                long: {
                    value: null,
                    isTouched: false
                },
            },
            background: "",
            checkPassword: false,
        };
    }

    onChangeValue = (field, value) => {
        let form = this.state.form;
        form[field].value = value;
        this.setState({ form });
    }

    componentWillMount = async () => {
    }

    onTouched = field => {
        if (field === "re_password") {
            this.setState({
                checkPassword: false,
            })
        }
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

    isCompany = () => {
        return this.props.role === "company";
    };

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

    onSubmit2 = (e) => {
        e.preventDefault();
        let isError = false;
        let form = this.state.form;
        const fields = [
            "fullname",
            "username",
            "birthday",
            "email",
            "password",
            "re_password",
        ];

        for (let i = 0; i < fields.length; i++) {
            form[fields[i]].isTouched = true;

            if (form[fields[i]].value === null || form[fields[i]].value.length < 1) {
                isError = true;
            }
        }
        this.setState({ form });

        if (form.password.value !== form.re_password.value && form.password.value.length > 0 && form.re_password.value.length > 0) {
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

        datas["role"] = "customer";
        datas["birthday"] = this.state.form.birthday.value.format('YYYY-MM-DD');
        this.props.updateLoading(true);
        internalApi
            .post("auth/register/seeker", datas)
            .then(async res => {
                this.props.updateLoading(false);
                if (res.success) {
                    message.success('Register successfully!');
                    this.props.history.push('/login');
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

    onSubmit1 = (e) => {
        console.log("submit 1")
        e.preventDefault();
        let isError = false;
        let form = this.state.form;
        let datas = new FormData();
        const fields = [
            "email",
            "fullname",
            "username",
            "vatnumber",
            "phone",
            "postalcode",
            "password",
            "city",
            "country",
            "address",
            "lat",
            "long"
        ];

        for (let i = 0; i < fields.length; i++) {
            form[fields[i]].isTouched = true;
            if (form[fields[i]].value === null || form[fields[i]].value.length < 1) {
                isError = true;
            }
        }
        this.setState({ form });
        if (form.password.value !== form.re_password.value && form.password.value.length > 0 && form.re_password.value.length > 0) {
            this.setState({
                checkPassword: true,
            })
            isError = true;
        }
        if (isError) {
            return;
        }

        for (let i = 0; i < fields.length; i++) {
            datas.append(fields[i], this.state.form[fields[i]].value);
        }
        datas.append("background", this.state.background);
        console.log('datas = ', datas)
        this.props.updateLoading(true);
        internalApi
            .post("auth/register/company", datas)
            .then(async res => {
                this.props.updateLoading(false);
                if (res.success) {
                    message.success('Register successfully!');
                    this.props.history.push('/login');
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

    _handleImageChange = (field, value) => {
        const file = this.state;
        file[field] = value;
        this.setState({
            file,
        });

    }

    render() {
        const { role } = this.props;
        return (
            <div>

                <div className="contents-main" id="contents-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-xs-12">
                                <article
                                    id="post-145"
                                    className="post-145 page type-page status-publish hentry"
                                >
                                    <div className="entry-content">
                                        <div className="iwj-register">
                                            <form
                                                id="formmmm"
                                                onSubmit={this.isCompany() ? this.onSubmit1 : this.onSubmit2}
                                                className="iwj-form iwj-register-form2 formData"
                                            >
                                                <div className="iwj-magic-line-wrap">
                                                    <div className="iwj-magic-line">
                                                        {
                                                            role === "seeker" && (
                                                                <p className="">
                                                                    User
                                                                </p>
                                                            )
                                                        }

                                                        {
                                                            role === "company" && (
                                                                <p className="">
                                                                    Company
                                                                </p>
                                                            )
                                                        }

                                                    </div>
                                                </div>


                                                <div className="iwj-field">
                                                    <label>Email</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-envelope-o" />
                                                        <input
                                                            placeholder="Enter email"
                                                            name="email"
                                                            type="email"
                                                            value={this.state.form.email.value}
                                                            onChange={e =>
                                                                this.onChangeValue("email", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("email")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.email.value.length <= 0 && this.state.form.email.isTouched ? 'block' : 'none', color: "red" }} >Email is required!</FormFeedback>
                                                    </div>
                                                    <p className="text-danger err-register-email" />
                                                </div>

                                                <div className="iwj-field">
                                                    <label> {role === 'seeker' ? "Full name" : "Company name"}</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-user" />
                                                        <input
                                                            placeholder="Full name"
                                                            name="fullname"
                                                            value={this.state.form.fullname.value}
                                                            onChange={e =>
                                                                this.onChangeValue("fullname", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("fullname")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.fullname.value.length <= 0 && this.state.form.fullname.isTouched ? 'block' : 'none', color: "red" }} >Name is required!</FormFeedback>
                                                    </div>
                                                </div>

                                                <div className="iwj-field">
                                                    <label>Username</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-user" />
                                                        <input
                                                            placeholder="Username"
                                                            name="username"
                                                            value={this.state.form.username.value}
                                                            onChange={e =>
                                                                this.onChangeValue("username", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("username")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.username.value.length <= 0 && this.state.form.username.isTouched ? 'block' : 'none', color: "red" }} >Username is required!</FormFeedback>
                                                    </div>
                                                </div>

                                                {role === 'company' && (
                                                    <div>
                                                        <div className="iwj-field company-field">
                                                            <label>Company photo</label>
                                                            <div className="iwj-input">
                                                                <i className="fa fa-building" />
                                                                <input
                                                                    type="file"
                                                                    id="image"
                                                                    name="background"
                                                                    placeholder=""
                                                                    onChange={e =>
                                                                        this._handleImageChange("background", e.target.files[0])
                                                                    }
                                                                    className="form-control"
                                                                />
                                                                <p className="text-danger err-register-image" />
                                                            </div>
                                                        </div>

                                                        <div className="iwj-field">
                                                            <label>Company description</label>
                                                            <div className="iwj-input">
                                                                <i className="fa fa-user" />
                                                                <input
                                                                    placeholder="Description"
                                                                    name="description"
                                                                    value={this.state.form.description.value}
                                                                    onChange={e =>
                                                                        this.onChangeValue("description", e.target.value)
                                                                    }
                                                                    onBlur={() => this.onTouched("description")}
                                                                />
                                                                <FormFeedback style={{ display: this.state.form.description.value.length <= 0 && this.state.form.description.isTouched ? 'block' : 'none', color: "red" }} >Description is required!</FormFeedback>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                                <div className="iwj-field">
                                                    <label>Date of birth</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-user" />
                                                        <DatePicker
                                                            allowClear={false}
                                                            className={`form-control ${this.checkValidate(this.state.form.birthday, true) ? 'is-invalid' : ''}`}
                                                            value={this.state.form.birthday.value}
                                                            placeholder="Birthday"
                                                            onChange={(date) => this.onChangeValue("birthday", date)}
                                                            onBlur={() => this.onTouched("birthday")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.birthday.value.length <= 0 && this.state.form.birthday.isTouched ? 'block' : 'none', color: "red" }} >Date of birth is required!</FormFeedback>
                                                    </div>
                                                </div>

                                                {role === 'company' && (<div className="iwj-field">
                                                    <label>Company Phone</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-user" />
                                                        <input
                                                            placeholder="Phone number"
                                                            name="phone"
                                                            value={this.state.form.phone.value}
                                                            onChange={e =>
                                                                this.onChangeValue("phone", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("phone")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.phone.value.length <= 0 && this.state.form.phone.isTouched ? 'block' : 'none', color: "red" }} >Phone is required!</FormFeedback>
                                                    </div>
                                                </div>)}

                                                <div className="iwj-field">
                                                    <label>Password</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-keyboard-o" />
                                                        <input
                                                            placeholder="Enter password"
                                                            name="password"
                                                            type="password"
                                                            value={this.state.form.password.value}
                                                            onChange={e =>
                                                                this.onChangeValue("password", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("password")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.password.value.length <= 0 && this.state.form.password.isTouched ? 'block' : 'none', color: "red" }} >Password is required!</FormFeedback>
                                                    </div>
                                                    <p className="text-danger err-register-password" />
                                                </div>
                                                <div className="iwj-field">
                                                    <label>Re-enter password</label>
                                                    <div className="iwj-input">
                                                        <i className="fa fa-keyboard-o" />
                                                        <input
                                                            placeholder="Re-enter password"
                                                            name="re_password"
                                                            type="password"
                                                            value={this.state.form.re_password.value}
                                                            onChange={e =>
                                                                this.onChangeValue("re_password", e.target.value)
                                                            }
                                                            onBlur={() => this.onTouched("re_password")}
                                                        />
                                                        <FormFeedback style={{ display: this.state.form.re_password.value.length > 0 && this.state.checkPassword ? 'block' : 'none', color: "red" }} >Repeat password error!</FormFeedback>
                                                        <FormFeedback style={{ display: this.state.form.re_password.value.length <= 0 && this.state.form.re_password.isTouched ? 'block' : 'none', color: "red" }} >Repeat password is required!</FormFeedback>
                                                    </div>
                                                    <p className="text-danger err-register-re_password" />
                                                </div>

                                                {
                                                    role === "company" && (
                                                        <div>

                                                            <div className="iwj-field company-field">
                                                                <label>Company's location</label>
                                                                <div className="iwj-input">
                                                                    <i className="fa fa-location-arrow" />
                                                                    <Geosuggest
                                                                        placeholder="In which city your company located ?"
                                                                        inputClassName="form-control"
                                                                        // need city and country
                                                                        skipSuggest={(s) => s.types.indexOf('locality') < 0 || s.types.indexOf('political') < 0}
                                                                        onSuggestSelect={s => {
                                                                            this.onChangeValue("city", s ? s.gmaps.address_components[0].long_name : null);
                                                                            this.onChangeValue("country", s ? s.gmaps.address_components.pop().long_name : null);
                                                                        }}
                                                                        onBlur={() => this.onTouched("city")}
                                                                    />
                                                                    <FormFeedback style={{ display: this.state.form.city.value && this.state.form.city.value.length <= 0 && this.state.form.city.isTouched ? 'block' : 'none', color: "red" }} >Address is required!</FormFeedback>
                                                                </div>
                                                                <p className="text-danger err-register-address" />
                                                            </div>
                                                            <div className="iwj-field company-field">
                                                                <label>Company's full address</label>
                                                                <div className="iwj-input">
                                                                    <i className="fa fa-location-arrow" />
                                                                    <Geosuggest
                                                                        placeholder="Enter your company's full address"
                                                                        inputClassName="form-control"
                                                                        // need full address
                                                                        skipSuggest={(s) => s.types.indexOf('street_address') < 0 && s.types.indexOf('route') < 0}
                                                                        onSuggestSelect={s => {
                                                                            this.onChangeValue("lat", s ? s.location.lat : null);
                                                                            this.onChangeValue("long", s ? s.location.lng : null);
                                                                            this.onChangeValue("address", s ? s.description : null);
                                                                        }}
                                                                        onBlur={() => this.onTouched("address")}
                                                                    />
                                                                    <FormFeedback style={{ display: this.state.form.city.value && this.state.form.city.value.length <= 0 && this.state.form.city.isTouched ? 'block' : 'none', color: "red" }} >Address is required!</FormFeedback>
                                                                </div>
                                                                <p className="text-danger err-register-address" />
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                <div className="register-account text-center">
                                                    By clicking
                                                    <span className="theme-color"> Sign up</span>, you agree with<span> </span>
                                                    <a
                                                        target="_blank"
                                                        href=""
                                                    >
                                                        <span> </span>Terms<span> </span>
                                                    </a>
                                                    <span> </span>and <span> </span>
                                                    <a
                                                        target="_blank"
                                                        href=""
                                                    >
                                                        Conditions
                                                    </a>
                                                </div>
                                                <div className="iwj-respon-msg iwj-hide" />
                                                <div className="iwj-button-loader">
                                                    <input
                                                        type="hidden"
                                                        name="role"
                                                        defaultValue="candidate"
                                                    />
                                                    <button
                                                        type="submit"
                                                        name="register"
                                                        className="iwj-btn iwj-btn-primary iwj-btn-full iwj-btn-large iwj-register-btn"
                                                    >
                                                        Sign up
                                                    </button>
                                                </div>
                                                { role === "seeker" && <div className="iwj-splitter"> or </div> }
                                                { role === "seeker" && <div className="iwj-button-loader">
                                                    <FacebookButton
                                                        fbClick={this.fbClick}
                                                        fbResponse={this.fbSignUp}
                                                        buttonText={"Sign Up With Facebook"}
                                                    />
                                                </div> }
                                            </form>
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                    <footer className="entry-footer " />
                                </article>
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
};

export default connect(
    mapStateToProps,
    mapDispatchToprops
)(withRouter(FormRegister));

