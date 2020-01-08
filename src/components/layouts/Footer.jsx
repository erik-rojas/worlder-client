import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import '../../assets/scss/footer.scss'

class Footer extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="footer">
        <svg className="footer-bg" width="100%" height="300">
          <linearGradient spreadMethod="pad" id="LinearGradientFill-footer" x1="0.4879269301891327" x2="0.5" y1="0.05607951059937477" y2="1">
            <stop offset="0" stopColor="#070a20" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#5d6273" stopOpacity="1"></stop>
          </linearGradient>
          <path className="footer-bg-path" d="M 0 0 L 1941.493530273438 0 L 1941.493530273438 300 L 0 300 L 0 0 Z" />
        </svg>
        <div className="footer-use col-md-2">
          <div className="footer-use-header">Use Worldsty</div>
          <div className="footer-use-content">
            <li>
              <Link to="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link to="/for-business">For large and small business</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/advanced-software">Advanced Software</Link>
            </li>
            <li>
              <Link to="/mobile-app">Mobile app</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
            <li>
              <Link to="/faps">FAQs</Link>
            </li>
          </div>
        </div>
        <div className="footer-about col-md-7">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/investors">Investors</Link>
          </li>
          <li>
            <Link to="/security">Security</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li>
            <Link to="/cookies">Cookies</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
        </div>
        <div className="footer-connect col-md-2">
          <div className="footer-connect-header">Connect with us</div>
          <div className="footer-connect-content">
            <li>
              Facebook
              <a href="https://facebook.com">
                <img src={require('../../assets/img/Social/facebook.png')} alt="facebook" />
              </a>
            </li>
            <li>
              Instagram
              <a href="https://instagram.com">
                <img src={require('../../assets/img/Social/instagram.png')} alt="instagram" />
              </a>
            </li>
            <li>
              Twitter
              <a href="https://twitter.com">
                <img src={require('../../assets/img/Social/twitter.png')} alt="twitter" />
              </a>
            </li>
            <li>
              Linkedin
              <a href="https://linkedin.com">
                <img src={require('../../assets/img/Social/linkedin.png')} alt="linkedin" />
              </a>
            </li>
            <li>
              Contact Support
              <a href="https://facebook.com">
                <img src={require('../../assets/img/Social/contact.png')} alt="contact" />
              </a>
            </li>
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Footer);
