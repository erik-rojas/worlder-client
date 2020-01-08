import React, { Component } from "react";
import { Navbar } from "../components/layouts";
import { _qsParse } from "config/utils";
import FormRegister from '../components/register/FormRegister';
import SearchInput from '../components/SearchInput'

class Register extends Component {
  constructor(props) {
    super(props);
    this.checkRegister(props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.checkRegister(nextProps.location);
  }

  checkRegister = (location) => {
    if (
      _qsParse("role", location.search) !== "seeker" &&
      _qsParse("role", location.search) !== "company") {
      this.props.history.push("/");
    }
  }

  render() {

    return (
      <div className="wrapper">
        <div className="iw-overlay" />
        <div className="iw-header-version3 iw-header-version6">
          <div className="header header-default header-style-default v3 v6 header-sticky no-header-sticky-mobile ">
            <Navbar />
          </div>
        </div>
        <div className="page-heading default">
          <div className="container-inner">
            <div className="container">
              <div className="page-title">
                <div className="iw-heading-title">
                  {_qsParse("role", this.props.location.search) === 'seeker' ? <SearchInput history={this.props.history} /> : <div className="no-search-bar"></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FormRegister
          role={
            _qsParse("role", this.props.location.search)
          }
        />
      </div>
    );
  }
}

export default Register;
