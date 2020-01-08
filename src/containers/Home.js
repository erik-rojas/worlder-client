import React, { Component } from "react"
import { connect } from "react-redux"
import { Header, Footer } from "../components/layouts"

import { EventItem, FilterItem } from '../components/layouts'

import '../assets/scss/home.scss'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      total_events_number: 14,
      events: [],
      currentFilter: ''
    };
  }

  componentDidMount() {
    let { events } = this.state

    for (let i = 0; i < 8; i++) {
      events.push('event')
    }

    this.setState({ events })
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props

    if (search !== prevProps.search) {
      console.log('searchKey = ', search.searchKey)
    }
  }

  loadMore = () => {
    let { events, total_events_number } = this.state

    for (let i = 0; i < 8; i++) {
      events.push('event')
      if (events.length === total_events_number) break
    }

    this.setState({ events })
  }

  onFilterSelected = (filterName) => {
    console.log('filterName = ', filterName)
    this.setState({ currentFilter: filterName })
  }

  renderFilters = (filters) => filters.map((filter, key) => {
    const { currentFilter } = this.state
    return (<FilterItem
      key={key}
      imgUrl={filter.imgUrl}
      filterName={filter.filterName}
      onFilterSelected={filterName => this.onFilterSelected(filterName)}
      onSelected={currentFilter === filter.filterName ? true : false}
    />)
  })

  renderEvents = (events) => events.map((event, key) => {
    return (<EventItem
      key={key}
      imgUrl={require('../assets/images/event/event1.png')}
      eventDate={'SEP 11'}
      eventInfo={{}}
    />)
  })

  render() {
    const { search: { searchKey }} = this.props
    const { events, total_events_number } = this.state
    const event_list = [
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      },
      {
        title: 'Eclipse Presents: Junior Cert Results Night at Tamango Nightclub',
        content: 'Web, Sep 11, 8:00pm Tamangos, Portmamock Starts at €16.87'
      }
    ]
    const filter_list = [
      {
        imgUrl: require('../assets/images/event-filter/festivals.png'),
        filterName: 'Festivals'
      },
      {
        imgUrl: require('../assets/images/event-filter/night_club.png'),
        filterName: 'Night Club'
      },
      {
        imgUrl: require('../assets/images/event-filter/beach_club.png'),
        filterName: 'Beach Club'
      },
      {
        imgUrl: require('../assets/images/event-filter/pubs.png'),
        filterName: 'Pubs'
      },
      {
        imgUrl: require('../assets/images/event-filter/bars.png'),
        filterName: 'Bars'
      },
      {
        imgUrl: require('../assets/images/event-filter/concerts.png'),
        filterName: 'Concerts'
      },
      {
        imgUrl: require('../assets/images/event-filter/live_music.png'),
        filterName: 'Live music'
      }
    ]

    console.log('searchKey = ', searchKey)

    return (
      <div>
        <div className="home-main">
          <Header />
          <div className="contents-main">
            {!searchKey.length && <div className="content-title col-md-11">The best favourite clubs</div>}
            {searchKey.length && <div className="event-filter col-md-11">
              {this.renderFilters(filter_list)}
            </div>}
            <div className="events-container col-md-11">
              {this.renderEvents(events)}
            </div>
            {total_events_number > events.length && <div className="load-more" onClick={() => this.loadMore()}>Load More</div>}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
});

const mapDispatchToprops = {
}

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Home)
