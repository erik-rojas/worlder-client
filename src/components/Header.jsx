import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { _url, _urlServer } from '../config/utils';
import { connect } from 'react-redux';
import { withRouter } from "react-router"
import { logoutAuth } from '../actions/auth';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            scrolled: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 0 && !this.state.scrolled) {
            this.setState({
                scrolled: true
            });
        }
        if (window.scrollY < 1 && this.state.scrolled) {
            this.setState({
                scrolled: false
            });
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    checkEntertainer = () => {
        return this.props.history.location.pathname.indexOf('entertainer') < 0 && this.props.history.location.pathname.indexOf('financials') < 0 && this.props.history.location.pathname.indexOf('setup') < 0 && this.props.history.location.pathname.indexOf('gigzoo-guarantee') < 0 && this.props.history.location.pathname.indexOf('help') < 0;
    }

    renderAvatar = () => {
        if (this.props.auth.user_id) {
            if (this.props.auth.user_id.avatar && this.props.auth.user_id.avatar.length > 0) {
                if (this.props.auth.user_id.avatar.indexOf('http://') > -1 || this.props.auth.user_id.avatar.indexOf('https://') > -1) {
                    return <img alt="profile" className="nav-link profile" src={this.props.auth.user_id.avatar} />;
                }
                return <img alt="profile" className="nav-link profile" src={_urlServer(this.props.auth.user_id.avatar)} />;
            } else {
                return <img alt="profile" className="nav-link profile default-avatar" src={_url('assets/images/profile.png')} />;
            }
        } else {
            return null;
        }
    }

    isLogin = () => {
        return this.props.auth.user_id && this.props.auth.user_id._id && this.props.auth.user_id._id.length > 0;
    }

    onClickLogout = (e) => {
        this.props.logoutAuth();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className={`header container-fluid ${this.state.scrolled ? 'scrolled' : ''} ${this.props.history.location.pathname !== '/' ? 'header-dashboard' : ''}`}>
                <Navbar color="light" light expand="md">
                    <NavLink to="/" className="navbar-brand">
                        <img alt="logo" className="logo" src={_url('assets/img/logo_public_new.png')} />
                    </NavLink>
                    <img alt="dropdown" className="navbar-toggler" onClick={this.toggle} src={_url('assets/images/dropdown.svg')} />
{/* 
                    {
                        this.checkEntertainer() && false ? <SearchInput width="400px" color="#002c4a" placeholder='Try "Singer"' /> : null
                    } */}

                    <Collapse isOpen={this.state.isOpen} navbar className="right">
                        {
                            !this.checkEntertainer() ? <ul className="entertainer-menu">
                                <li>
                                    <NavLink to="/become-entertainer">Overview</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/setup">Set up</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/gigzoo-guarantee">Guarantee</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/financials">Financials</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/help">Help</NavLink>
                                </li>
                            </ul> : null
                        }
                        <Nav className="ml-auto" navbar>
                            {
                                this.isLogin() && this.props.auth.user_id.role === 'CUSTOMER' ? <NavItem>
                                    <NavLink to="/dashboard/favourites" className="nav-link">
                                        <img alt="heart" className="heart" src={_url('assets/images/Heart.png')} />
                                    </NavLink>
                                </NavItem> : null
                            }
                            {
                                (this.checkEntertainer() && !this.isLogin()) ? <NavItem>
                                    <NavLink to="/become-entertainer" className="nav-link">Talent Sign Up</NavLink>
                                </NavItem> : null
                            }
                            {
                                (this.checkEntertainer() && !this.isLogin()) ? <NavItem>
                                    <NavLink to="/register?role=customer" className="nav-link">Customer Sign Up</NavLink>
                                </NavItem> : null
                            }
                            {
                                (this.checkEntertainer() && !this.isLogin()) ? <NavItem>
                                    <NavLink to="/login" className="nav-link">Log In</NavLink>
                                </NavItem> : null
                            }
                            {
                                this.checkEntertainer() && !this.isLogin() ? <NavItem>
                                    <NavLink to="/help" className="nav-link">Help</NavLink>
                                </NavItem> : null
                            }
                            {
                                this.isLogin() ? <NavItem>
                                    <NavLink to={`/dashboard`} className="nav-link">My Dashboard</NavLink>
                                </NavItem> : null
                            }
                            {
                                this.isLogin() && (this.props.auth.user_id && this.props.auth.user_id.role === 'ENTERTAINER') ? <NavItem>
                                    <NavLink to={`/dashboard/refer`} className="nav-link">Refer a Friend</NavLink>
                                </NavItem> : null
                            }
                            {
                                !this.isLogin() && this.renderAvatar()
                            }
                            {/* {
                                this.isLogin() && (
                                    <NavItem className="hd-link notify-content">
                                        < HeaderNotification
                                            user_id={this.props.auth.user_id._id}
                                            role={this.props.auth.user_id.role}
                                        />
                                    </NavItem>

                                )
                            } */}
                            {
                                this.isLogin() && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {
                                                this.renderAvatar()
                                            }
                                            <span className="nav-link username">{this.isLogin() ? this.props.auth.user_id.first_name : 'User'}</span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink to={`/dashboard/profile`} className="items">My Profile</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to={`/dashboard/settings`} className="items">Setting</NavLink>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.onClickLogout}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutAuth: () => {
            dispatch(logoutAuth());
        }
    }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Header));
