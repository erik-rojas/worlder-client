import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MyLoadingComponent from 'components/MyLoadingComponent';
import Loadable from 'react-loadable';
import LoginRequiredRoute from './LoginRequiredRoute';

const CompanyDetail = Loadable({ loader: () => import("./CompanyDetail"), loading: MyLoadingComponent });
const companyPage = Loadable({ loader: () => import("./companyPage"), loading: MyLoadingComponent });
const Login = Loadable({ loader: () => import("./Login"), loading: MyLoadingComponent });
const CompanyLogin = Loadable({ loader: () => import("./CompanyLogin"), loading: MyLoadingComponent });
const Home = Loadable({ loader: () => import("./Home"), loading: MyLoadingComponent });
const Dashboard = Loadable({ loader: () => import("./Dashboard"), loading: MyLoadingComponent });

function NotFound() {
    return (
        <div>
            <h1>404 - NOT FOUND</h1>
        </div>
    )
}

function NotLoginRequiredRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed !== true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />}
        />
    )
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: true
        }
    }

    componentDidMount(){
        this.setState({
            is_loading: false,
          })
    }

    isLogin = () => {
        return this.props.auth.user_id && this.props.auth.user_id._id && this.props.auth.user_id._id.length > 0;
    }

    render() {
        return (
            <div className="Root-App">
                {
                    !this.state.is_loading ?
                        <Switch>
                            <NotLoginRequiredRoute authed={this.isLogin()} path="/user/login" component={Login} />
                            <NotLoginRequiredRoute authed={this.isLogin()} path="/company/login" component={CompanyLogin} />
                            {/* <Route path="/companies" component={companyPage} /> */}
                            <Route exact path="/" component={Home} />
                            <LoginRequiredRoute path="/dashboard" component={Dashboard} />
                            <Route path="/company/:id" component={CompanyDetail} />
                            <Route path="/companies" component={companyPage} />
                            <Route component={NotFound} />
                        </Switch> : null
                }
            </div>
        );
    }
}
const mapStateToprops = state => {
    return {
        auth: state.auth
    };
};

export default withRouter(connect(mapStateToprops)(App));