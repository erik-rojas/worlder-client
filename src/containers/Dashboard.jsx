import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { Navbar, LeftSideBar } from '../components/layouts';
import { connect } from 'react-redux';
import { Profile as ProfileCompany,
  ChangePassword, 
  OverView,
} from "../components/company";
import { Profile as ProfileSeeker,
 } from '../components/seeker';
 
 function NotFound() {
  return (
      <div>
          <h1>404 - NOT FOUND</h1>
      </div>
  )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  componentWillMount(){

  }

  renderDashboard = () => {
    if (this.props.auth.user_id.role === 'seeker') {
      return ProfileSeeker;
    }
    return OverView;
  }

  renderProfile = () => {
    if (this.props.auth.user_id.role === 'seeker') {
      return ProfileSeeker;
    }
    return ProfileCompany;
  }

  render() {
    let { url } = this.props.match;

    return (
      <div className="wrapper">
        <div className="iw-header-version3 iw-header-version6">
          <div className="header header-default header-style-default v3 v6 header-sticky no-header-sticky-mobile ">
            <Navbar />
          </div>
        </div>
        <div className="contents-main" id="contents-main">
            <article id="post-141" className="post-141 page type-page status-publish hentry">
              <div className="entry-content">
                <div className="iwj-dashboard clearfix">
                  <div className="iwj-dashboard-main jobs">
                    <Switch>
                      <Route exact path={`${url}`} render={props => <Redirect to={`${url}/index`} />} />
                      <Route exact path={`${url}/overview`} component={OverView} />
                      <Route exact path={`${url}/profile`} component={this.renderProfile()} />
                      <Route exact path={`${url}/index`} component={this.renderDashboard()} />
                      <Route exact path={`${url}/change-password`} component={ChangePassword} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                    <LeftSideBar />
                </div>
              </div>
              <div className="clearfix" />
            </article>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withRouter(Dashboard));
