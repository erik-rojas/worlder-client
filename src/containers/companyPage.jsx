import React, { Component } from 'react';
import { Navbar } from "../components/layouts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCompanies } from '../actions/company';
import Geosuggest from "react-geosuggest";
import { _url, _urlServer } from '../config/utils';
import { Row, Col } from "antd";
class jobPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
    }

    componentWillMount() {
        if (this.props.history.location && this.props.history.location.state && this.props.history.location.state.city && this.props.history.location.state.country) {
            this.props.getAllCompanies(this.props.history.location.state.city, this.props.history.location.state.country);
        } else {
            this.props.getAllCompanies();
        }
    }

    searchCompany = (city = null, country = null) => {
        this.props.getAllCompanies(city, country);
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
                                    {/* <SearchInput handleSearch={this.searchCompany} /> */}
                                    <div className='search-input' >
                                        <fieldset className="field-container">
                                            <Geosuggest
                                                placeholder="Enter City"
                                                inputClassName="form-control"
                                                // only city is enough
                                                skipSuggest={(s) => s.types.indexOf('political') < 0}
                                                onSuggestSelect={s => {
                                                    this.searchCompany(s ? s.gmaps.address_components[0].long_name : null, s ? s.gmaps.address_components.pop().long_name : null)
                                                }}
                                            />
                                            <div className="icons-container">
                                                <div className="icon-search"></div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contents-main" id="contents-main" style={{ transform: 'none' }}>
                    <div className="container" style={{ transform: 'none' }}>
                        <div className="row" style={{ transform: 'none' }}>
                            <div className="col-md-3 iwj-sidebar-sticky iwj-sidebar-1" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>

                            </div>
                            <div className="col-md-7">
                                <div className="iwj-content">
                                    <article id="post-656" className="post-656 page type-page status-publish hentry">
                                        <div className="entry-content">
                                            <div className="vc_row wpb_row vc_row-fluid">
                                                <div className="wpb_column vc_column_container vc_col-sm-12">
                                                    <div className="vc_column-inner">
                                                        <div className="wpb_wrapper">
                                                            <div className="iwj-content-inner">
                                                                <div id="iwajax-load" className="iwj-jobs-style style1 column-3">
                                                                    <div className="iwj-jobs iwj-listing">
                                                                        <div className="iwj-job-items iwj-job-items-margin">
                                                                            {
                                                                                Object.entries(this.props.companies).length > 0 && this.props.companies.data.length > 0 && this.props.companies.data.map((val, key) => {
                                                                                    return (
                                                                                        <div className="iwj-employer-item list" key={key} itemScope itemType="http://schema.org/Organization">
                                                                                            <Row>
                                                                                                <Col className="vertically-center padding-right-20" span={6}>
                                                                                                    <div className="employer-image">
                                                                                                        <Link to={`/company/${val._id}`}>
                                                                                                            <img alt="SFlower" src={val.background ? _urlServer(val.background) : _url("assets/images/job_default.jpg")} className="company-background" height={120} width={120}/>
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                </Col>

                                                                                                <Col span={18}>
                                                                                                    <div className="employer-info">
                                                                                                        {/* <div className="info-top">
                                                                                                            <h3 itemProp="name">
                                                                                                                <Link to={`/company/${val._id}`} className="employer-name">{val.user_id ? val.user_id.fullname : ""}</Link>
                                                                                                            </h3>
                                                                                                        </div> */}
                                                                                                        <div className="info-company">
                                                                                                            <div className="company">
                                                                                                                <i className="fa fa-suitcase" />
                                                                                                                <Link to={`/company/${val._id}`}>{val.user_id ? val.user_id.fullname : ""}</Link>
                                                                                                            </div>
                                                                                                            <div className="address">
                                                                                                                <i className="ion-android-pin" />{val.address}
                                                                                                            </div>
                                                                                                            <div className="address">
                                                                                                                <i className="ion-ios-information-outline" />{val.description.slice(0, 150)}...
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <br></br>
                                                                                                    </div>
                                                                                                </Col>
                                                                                            </Row>



                                                                                            <div className="clearfix" />
                                                                                        </div>

                                                                                    )
                                                                                })

                                                                            }

                                                                            <div className="clearfix" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <input type="hidden" name="url" id="url" defaultValue="http://jobboard.inwavethemes.com/jobs" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <footer className="entry-footer ">
                                        </footer>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    companies: state.company.companies,
});

const mapDispatchToprops = {
    getAllCompanies,
}


export default connect(
    mapStateToProps,
    mapDispatchToprops
)(jobPage);
