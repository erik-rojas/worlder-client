import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateAuth } from "../../actions/auth";
import request from "../../api/request";
import { message } from "antd";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        };
    }

    componentWillMount() {
    }

    handleChange = (value, name) => {
        let stateName = this.state;
        stateName[name] = value;

        this.setState({
            stateName
        })
    }

    ChangePassword = () => {
        let datas = {
            old_pass: this.state.oldPassword,
            new_pass: this.state.newPassword,
            new_pass_retype: this.state.repeatPassword,
        }
        console.log(datas);
        
        request()
        .put(`/users/change-password`, datas)
        .then( res => {
            if (res.data.success) {
                message.success('Updated successfully!');
                this.props.updateAuth();
                this.setState({
                    oldPassword: "",
                    newPassword: "",
                    repeatPassword: ""
                })
            } else {
                message.error(res.data.message ? res.data.message : '');
            }
        })
        .catch(err => {
            message.error(err.response.data ? err.response.data.message : '');
            console.log(err);
        });

    }


    render() {
        return (

            <div className="iwj-dashboard-main-inner">
                <div className="iwj-overview iwj-profile clearfix">
                    <div className="info-top-wrap info-top-wrap-employer">
                        <div className="main-information employer-info">
                            <section className="content">
                                <form method="post" encType="multipart/form-data" className="text-left iwj-form-2">
                                    <div className="iwj-block">
                                        <div className="basic-area iwj-block-inner">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="iwjmb-field iwjmb-text-wrapper  required">
                                                        <div className="iwjmb-label">
                                                            <label>Old password</label>
                                                        </div>
                                                        <div className="iwjmb-input ui-sortable">
                                                            <input size={30} placeholder="Enter old password"  value={this.state.oldPassword} onChange={(e) => this.handleChange( e.target.value , "oldPassword" )} type="password" required="required" id="oldPassword" className="iwjmb-text " name="oldPassword" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="iwjmb-field iwjmb-text-wrapper  required">
                                                        <div className="iwjmb-label">
                                                            <label>New password</label>
                                                        </div>
                                                        <div className="iwjmb-input ui-sortable">
                                                            <input size={30} placeholder="Enter new password"  value={this.state.newPassword} onChange={(e) => this.handleChange( e.target.value , "newPassword" )} type="password" required="required" id="newPassword" className="iwjmb-text " name="newPassword" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="iwjmb-field iwjmb-text-wrapper  required">
                                                        <div className="iwjmb-label">
                                                            <label>Confirm new password</label>
                                                        </div>
                                                        <div className="iwjmb-input ui-sortable">
                                                            <input size={30} placeholder="Confirm new password"  value={this.state.repeatPassword} onChange={(e) => this.handleChange( e.target.value , "repeatPassword" )} type="password" required="required" id="reNewPassword" className="iwjmb-text " name="reNewPassword" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iwj-button-loader-respon-msg clearfix">
                                                <button onClick={this.ChangePassword} type="button" className="iwj-btn iwj-btn-primary" >Change password</button>
                                            </div>
                                        </div>
                                    </div></form></section>
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
