import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _url, _getImageURL } from "../../config/utils";
import { Link } from "react-router-dom";

import { changeAvatar } from '../../actions/auth'
import internalApi from "../../config/internalApi";

class OverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    clickEditProfilePhoto = () => {
        this.refs.profileAvatarInput.click()
    }

    changeProfileAvatar = e => {
        const { changeAvatar, auth } = this.props
        let files = e.target.files
        
        if (files.length > 0) {
            console.log('aaaa')
            let file = files[0]
            let datas = {}
            datas['email'] = auth.user_id.email
            datas['avatar'] = {file: files[0]}
            console.log('datas = ', datas)
            internalApi.post("auth/uploadavatar", datas).then(async res => {
                
            })
            .catch(err => {
                
            });
        }
    }

    renderAvatar = () => {
        const { auth } = this.props
        const avatarURL = _getImageURL(auth.background)
        // if (auth.user_id) {
        //   if (auth.user_id.avatar && auth.user_id.avatar.length > 0) {
        //     if (auth.user_id.avatar.indexOf('http://') > -1 || auth.user_id.avatar.indexOf('https://') > -1) {
        //       return <img alt="profile" className="avatar avatar-96 photo" src={auth.user_id.avatar} />;
        //     }
        //     return <img alt="profile" className="avatar avatar-96 photo" src={_urlServer(auth.user_id.avatar)} />;
        //   } else {
        //     return <img alt="profile" className="avatar avatar-96 photo" src={_url('assets/images/profile.png')} />;
        //   }
        // } else {
        //   return null;
        // }
        if (avatarURL) {
            if (avatarURL && avatarURL.length > 0) {
                return (<img alt="profile" className="avatar avatar-96 photo" src={avatarURL} />)
            } else {
                return (<img alt="profile" className="avatar avatar-96 photo" src={_url('assets/images/profile.png')} />)
            }
        }
    }

    render() {
        const { user_id } = this.props.auth
        return (

            <div className="iwj-dashboard-main-inner">
                <div className="iwj-overview iwj-profile clearfix">
                    <div className="info-top-wrap info-top-wrap-employer">
                        <div className="main-information employer-info">
                            <div className="empl-box-2x employer-contact">
                                <div className="empl-box content-info">
                                    <div className="avatar" onClick={() => this.clickEditProfilePhoto()}>
                                        {this.renderAvatar()}
                                        <span className="avatar-change">Change Avatar</span>
                                    </div>
                                    <input type="file" ref="profileAvatarInput" style={{ display: "none" }} onChange={e => this.changeProfileAvatar(e)} />
                                    <div className="empl-detail-info">
                                        <h4 className="iwj-epl-title">
                                            <a href="">
                                               {user_id.name} </a>
                                        </h4>
                                        <span>Company Info</span>
                                        <div className="empl-action-button">
                                            <Link className="iwj-edit-profile" to="/dashboard/profile"><i className="fa fa-edit" />Edit Info</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Jobs listing*/}
                            {/* <div className="empl-info-jobs-listing">
                                <div className="info-wrap">
                                    <div className="empl-info-jobs-item">
                                        <div className="empl-box jobs-listing">
                                            <div className="empl-small-detail">
                                                <h5>0</h5>
                                                <a href="">Tất cả danh sách</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="empl-info-jobs-item">
                                        <div className="empl-box jobs-published">
                                            <div className="empl-small-detail">
                                                <h5>0</h5>
                                                <a href="">khả dụng</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="empl-info-jobs-item">
                                        <div className="empl-box jobs-expired">
                                            <div className="empl-small-detail">
                                                <h5>0</h5>
                                                <a href="">Hết hạn</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="empl-info-jobs-item">
                                        <div className="empl-box jobs-pending">
                                            <div className="empl-small-detail">
                                                <h5>0</h5>
                                                <a href="">Đang chờ xử lý</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="iw-profile-content">
                        <div className="iwj-employerdl-content row">
                            <div className="col-md-6 employer-detail-container">
                                <div className="employer-recent-applier">
                                    <div className="title-block">
                                        <h3 className="info-title">Some other info</h3>
                                        <div className="count"><span>0</span></div>
                                    </div>
                                    <div className="employer-main-applier">
                                        <div className="iwj-table-overflow-x">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th width="40%">Name</th>
                                                        <th width="35%">Email</th>
                                                        <th width="25%">Address</th>
                                                    </tr>
                                                </thead>
                                                {/* <tbody>
                                                    <tr className="iwj-empty">
                                                        <td colSpan={3}>Công việc được tìm nhiều nhất sẽ hiện thị ở đây</td>
                                                    </tr>
                                                </tbody> */}
                                            </table>
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

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = {
    changeAvatar
}

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
