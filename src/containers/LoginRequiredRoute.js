import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from "react-router-dom";
import MyLoadingComponent from '../components/MyLoadingComponent';

// actions 
import {
    updateAuth,
    logoutAuth
} from '../actions/auth';

class LoginRequiredRoute extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            Component: MyLoadingComponent
        }
    }

    componentDidMount() {
        this.checkAuth()
    }

    componentDidUpdate(preProps) {
        if(preProps.location.pathname !== this.props.location.pathname) this.checkAuth()
    }

    checkAuth() {
        if (/^\/dashboard.*/.test(this.props.location.pathname)) {
            if (!this.props.auth.token) {
                this.props.dispatch(logoutAuth())
                this.props.history.push('/login')
            } else {
                this.props.dispatch(updateAuth())
            }
        }
    }

    render() {
        const { component: Component, authed, ...rest } = this.props
        return (
            <Route
                {...rest}
                path={this.props.path}
                render={props => {
                    return <Component {...props} />
                }}
            />
        )
    }
}

const mapStateToprops = state => {
    return {
        auth: state.auth
    };
};


export default withRouter(connect(mapStateToprops)(LoginRequiredRoute))