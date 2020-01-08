import React, { Component } from "react"
import { connect } from "react-redux"
import { Navbar, SearchInput } from "./index"

import '../../assets/scss/header.scss'

class Header extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  static defaultProps = {
    bSearchShow: true
  }

  render() {
    const { bSearchShow } = this.props

    return (
      <div>
        <div className="wrapper">
          <div className="header header-default">
            <Navbar />
          </div>
          {bSearchShow && <SearchInput history={this.props.history} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToprops = {
}

export default connect(mapStateToProps, mapDispatchToprops)(Header);
