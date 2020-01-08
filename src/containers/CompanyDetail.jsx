import React, { Component } from 'react';
import { Navbar } from "../components/layouts";
import { _url, _urlServer } from '../config/utils';
import { getCompanyDetail } from '../actions/company';
import { connect } from "react-redux";
import { updateLoading } from '../actions/loading';
import { updateAuth } from '../actions/auth';

class CompanyDetail extends Component {
    constructor() {
        super();
        this.state = {
            isFollow: false,
        };
    }

    componentWillMount() {
        this.props.getCompanyDetail(this.props.match.params.id);
    }

    checkSaveJob = (id) => {
        if ( this.props.auth && Object.entries(this.props.auth).length > 0 && this.props.auth.user_id.role === "seeker" ) {
            return this.props.auth.saved_jobs.includes(id);
          }
      }
    render() {
        const { company } = this.props;
        // const urlMap = `https://maps.google.it/maps?q=${company.data.city}&output=embed`;
        const urlMap = `https://maps.google.it/maps?q=${company.data.lat},${company.data.long}&output=embed`;

        console.log({urlMap})
        return (
            <div className="wrapper">
                <div className="iw-overlay" />
                <div className="iw-header-version3 iw-header-version6">
                    <div className="header header-default header-style-default v3 v6 header-sticky no-header-sticky-mobile ">
                        <Navbar />
                    </div>
                </div>

                <div className="iwj-employer-detail v2">
                    <div className="employer-detail-v2 iwj-single-parallax">
                        <div id="bg_jobdetail" className="iw-parallax" data-iw-paraspeed="0.1" />
                        <div className="iw-parallax-overlay" />
                        <div className="employer-detail-content-wrap">
                            <div className="employer-info-top-wrap">
                                <div className="container">
                                    <div className="employer-info-top">
                                        <div className="info-top" style={{ marginBottom: 'inherit' }}>
                                            <div className="employer-logo">
                                                <img alt="Plantthemes" src={company.data ? _urlServer(company.data.background) : _url("assets/images/no_picture.jpg")} className="avatar avatar-120 photo" height={120} width={120} />
                                            </div>
                                            <div className="conttent-right">
                                                <h3 className="title theme-color" itemProp="name">{company.data ? company.data.user_id.fullname : ""}</h3>
                                                <div className="social-link">
                                                    <ul className="iw-social-all hover-bg" />
                                                </div>
                                            </div>
                                            <meta itemProp="telephone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-xs-12 col-lg-8 col-md-8">
                                        <div className="iwj-employerdl-content">
                                            <div className="iwj-gallery-detail marginBot30">
                                                <ul className="bxslider">
                                                    <li>
                                                        <div>
                                                            <img alt="Plantthemes" src={company.data ? _urlServer(company.data.background) : _url("assets/images/no_picture.jpg")} className=" photo" height={700} width={700} />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="employer-detail-info">
                                                <div className="iwj-employerdl-des">
                                                    <div className="title">
                                                        <h3 className="theme-color">Company Detail</h3>
                                                    </div>
                                                    <div className="content">
                                                        <p>{company.data ? company.data.description : "No description"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="iwj-sidebar-sticky col-sm-12 col-xs-12 col-lg-4 col-md-4">
                                        <div className="widget-area" role="complementary">
                                            <aside id="iwj_employer_map-3" className="widget widget_iwj_employer_map">
                                                <iframe title="sdfs" width={350} height={350} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src={urlMap} />
                                            </aside>
                                            <aside id="iwj_employer_infomation-3" className="widget widget_iwj_employer_infomation">
                                                <h3 className="widget-title"><span>Company Infomation</span></h3>
                                                <div className="iwj-employer-widget-wrap">
                                                    <div className="iwj-widget-information iwj-single-widget style2">
                                                        <ul>
                                                            <li>
                                                                <i className="icon-injob-map-pin" />
                                                                <div className="content"> <label>Address</label> <span className="map">{company.data ? company.data.address : ""}</span></div>
                                                            </li>
                                                            <li>
                                                                <i className="icon-injob-layers" />
                                                                <div className="content"> <label>Email : {company.data ? company.data.user_id.email : ""} </label>  </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    company: state.company.company,
});

const mapDispatchToprops = {
    getCompanyDetail,
    updateLoading,
    updateAuth,
}


export default connect(
    mapStateToProps,
    mapDispatchToprops
)(CompanyDetail);