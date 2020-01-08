import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import '../../assets/scss/event_item.scss'

class EventItem extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const { imgUrl, eventDate, eventInfo } = this.props

    return (
      <div className="event-item col-md-3">
        <div className="event-img">
          <img src={imgUrl} alt="" />
        </div>
        {/* <div className="event-content col-md-11">
          <div className="event-date col-md-1">{eventDate}</div>
          <div className="event-desc col-md-10">
            <div className="description-header">{eventInfo.title}</div>
            <div className="description-content">{eventInfo.content}</div>
          </div>
        </div> */}
      </div>
    );
  }
}

EventItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventInfo: PropTypes.object.isRequired
}

export default EventItem
