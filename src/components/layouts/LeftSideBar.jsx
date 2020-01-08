import React from "react";
import { _url, _urlServer } from "../../config/utils";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAuth } from '../../actions/auth';

class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_showMenu: false
    };

  }

  componentDidMount = () => {
    let { user_id } = this.props.auth;
    if (!user_id) {
      this.props.history.push("/login");
    }
  };

  componentWillMount() {

  }

  isCompany = () => {
    return this.props.auth.user_id.role === "company";
  };


  onClickLogout = (e) => {
    this.props.logoutAuth();
  }

  renderAvatar = () => {
    if (this.props.auth.user_id) {
      if (this.props.auth.user_id.avatar && this.props.auth.user_id.avatar.length > 0) {
        if (this.props.auth.user_id.avatar.indexOf('http://') > -1 || this.props.auth.user_id.avatar.indexOf('https://') > -1) {
          return <img alt="profile" className="avatar avatar-96 photo" src={this.props.auth.user_id.avatar} />;
        }
        return <img alt="profile" className="avatar avatar-96 photo" src={_urlServer(this.props.auth.user_id.avatar)} />;
      } else {
        return <img alt="profile" className="avatar avatar-96 photo" src={_url('assets/images/profile.png')} />;
      }
    } else {
      return null;
    }
  }

  render() {
    const { user_id } = this.props.auth;
    return (
      <div className="iwj-dashboard-sidebar">
        <div className="user-profile candidate clearfix">
          {this.renderAvatar()}
          <h4 className="text-f-sm"> <span>Hi {this.props.auth && this.props.auth.user_id && this.props.auth.user_id.username}!</span>
            {user_id.name}
          </h4>
          {/* <div className="wr_progress">
            <p>Hoàn thiện hồ sơ <span>15%</span></p>
            <div className="progress">
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} style={{ width: '15%' }}>
              </div>
            </div>
          </div> */}

        </div>
        <div className="iwj-dashboard-menu menu-jobseeker">
          <ul>
            {
              this.isCompany() && (
                <li>
                  <Link to="/dashboard/overview">
                    <i className="ion-ios-contact" />Dashboard
                  </Link >
                </li>
              )
            }
            <li>
              <Link to="/dashboard/profile">
                <i className="ion-ios-contact" /> {this.isCompany() ? "Company Profile" : "User Profile"}
              </Link >
            </li>
            {/* {
              this.isCompany() && (
                <li>
                  <Link to="/dashboard/company-info">
                    <i className="ion-ios-home" />Thông tin công ty1
                  </Link >
                </li>
              )
            } */}

            {/* {
              this.isCompany() && (
                <li>
                  <Link to="/dashboard/add-job">
                    <i className="ion-ios-compose" />Thêm mới công việc
                  </Link >
                </li>
              )
            }
            {
              this.isCompany() && (
                <li>
                  <Link to="/dashboard/all-jobs">
                    <i className="ion-briefcase" />Tất cả công việc
                  </Link >
                </li>
              )
            } */}

            {/* {
              this.isCompany() && (
                <li>
                  <Link to="#">
                    <i className="fa fa-briefcase" />Quản lý hồ sơ
              </Link >
                </li>
              )
            } */}

            {/* {
              !this.isCompany() && (
                <li className="">
                  <Link to="#" data-toggle="collapse" data-target="#demo" className="job-manage collapsed" aria-expanded="false">
                    <i className="fa fa-briefcase" />Quản lý việc làm<span />
                  </Link>
                  <ul id="demo" className="job-manage collapse" aria-expanded="false" style={{ height: '0px' }}>
                    <li>
                      <Link className="" to="/dashboard/jobs-saved">
                        <i className="fa fa-save" />Việc làm đã lưu
                    </Link>
                    </li>
                    <li>
                      <Link className="" to="/dashboard/jobs-applied">
                        <i className="fa fa-black-tie" />Việc làm đã nộp
                    </Link>
                    </li>
                  </ul>
                </li>

              )
            } */}
            {/* {
              !this.isCompany() && (
                <li >
                  <Link to="/dashboard/follow-company">
                    <i className="fa fa-newspaper-o" />Công ty đã theo dõi<i />
                  </Link >
                </li>
              )
            } */}

            <li>
              <Link to="/dashboard/change-password">
                <i className="fa fa-key" aria-hidden="true" />Change password
            </Link >
            </li>
            <li>
              <Link onClick={this.onClickLogout} to="/login">
                <i className="fa fa-power-off" />Log out
            </Link >
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToprops = store => {
  return {
    auth: store.auth
  };
};


const mapDispatchToProps = {
  logoutAuth,
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(LeftSideBar));
