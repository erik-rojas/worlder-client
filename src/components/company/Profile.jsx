import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { _url, _urlServer } from "../../config/utils";
import { connect } from "react-redux";
import { updateAuth } from "../../actions/auth";
import request from "../../api/request";
import { message } from "antd";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      city: "",
      country: "",
      email: "",
      description: "",
    };
  }

  componentWillMount() {
    if (this.props.auth) {
      let company = this.props.auth;
      console.log("===", company)
      this.setState({
        fullname: company.user_id.fullname,
        email: company.user_id.email,
        description: company.description,
        city: company.city,
        country: company.country,
      })
    }
  }

  handleChange = (value, name) => {
    let stateName = this.state;
    stateName[name] = value;

    this.setState({
      stateName
    })
  }

  UpdateProfile = () => {
    let datas = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
    }
    request()
      .put(`/users/update`, datas)
      .then(res => {
        if (res.data.success) {
          message.success('Update successfully!');
          this.props.updateAuth();
        } else {
          message.error(res.data.message ? res.data.message : '');
        }
      })
      .catch(err => {
        message.error(err.response ? err.response.message : '');
        console.log(err);
      });

  }


  renderAvatar = () => {
    if (this.props.auth.company) {
      if (this.props.auth.company.background && this.props.auth.company.background.length > 0) {
        if (this.props.auth.company.background.indexOf('http://') > -1 || this.props.auth.company.background.indexOf('https://') > -1) {
          return <img alt="profile" className="avatar avatar-96 photo" src={this.props.auth.company.avatar} />;
        }
        return <img alt="profile" className="avatar avatar-96 photo" src={_urlServer(this.props.auth.company.avatar)} />;
      } else {
        return <img alt="profile" className="avatar avatar-96 photo" src={_url('assets/images/profile.png')} />;
      }
    } else {
      return null;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="iwj-dashboard-main-inner">
        <div className="iwj-overview iwj-profile clearfix">
          <div className="info-top-wrap info-top-wrap-employer">
            <div className="main-information employer-info">
              <section className="content">
                <form encType="multipart/form-data" className="text-left iwj-form-2">
                  <div className="iwj-block">
                    <div className="basic-area iwj-block-inner">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="iwjmb-field iwjmb-text-wrapper  required">
                            <div className="iwjmb-label">
                              <label >Company name</label>
                            </div>
                            <div className="iwjmb-input ui-sortable">
                              <input size={30} placeholder="Enter company name" value={this.state.fullname} onChange={(e) => this.handleChange(e.target.value, "fullname")} type="text" required="required" id="firstname" className="iwjmb-text " fullname="user[firstname]" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="iwjmb-field iwjmb-text-wrapper  required">
                            <div className="iwjmb-label">
                              <label >Address</label>
                            </div>
                            <div className="iwjmb-input ui-sortable">
                              <input size={30} placeholder="Enter address" value={this.state.city} onChange={(e) => this.handleChange(e.target.value, "city")} type="text" required="required" id="lastname" className="iwjmb-text " name="user[lastname]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="iwjmb-field iwjmb-text-wrapper  required">
                            <div className="iwjmb-label">
                              <label >Email</label>
                            </div>
                            <div className="iwjmb-input ui-sortable">
                              <input size={30} placeholder="Enter email" value={this.state.email} onChange={(e) => this.handleChange(e.target.value, "email")} type="text" required="required" id="email" className="iwjmb-text " name="user[email]" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="iwjmb-field iwjmb-text-wrapper  required">
                            <div className="iwjmb-label">
                              <label >Description</label>
                            </div>
                            <div className="iwjmb-input ui-sortable">
                              <input size={30} placeholder="Enter description" value={this.state.description} onChange={(e) => this.handleChange(e.target.value, "description")} type="text" required="required" id="phone" className="iwjmb-text " name="user[phone]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="iwj-button-loader-respon-msg clearfix">
                        <button type="button" className="iwj-btn iwj-btn-primary" onClick={this.UpdateProfile} name="btn_submit">Update</button>
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
