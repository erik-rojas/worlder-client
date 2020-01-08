import React, { Component } from 'react'
import Geosuggest from "react-geosuggest"
import { connect } from "react-redux"

import { searchKeyChangedAction as searchKeyChanged } from '../../actions/search'
import { logoutAuth } from '../../actions/auth'

import '../../assets/scss/search_input.scss'

class SearchInput extends Component {

  componentWillMount() {
    this.props.searchKeyChanged('')
  }

  onSuggestSelect = (sugguest) => {
    console.log("suggest = ", sugguest)
  }

  onKeyPress = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      this.props.searchKeyChanged(event.target.value)
    }
  }

  render() {
    return (
      <div className="search-section">
        <div className="description-section">
          <span>Find the best places to go out, discounts, and more...</span>
        </div>
        <div className="field-container">
          <div className="search-where">
            <svg>
              <rect className="rect-search-where" rx="8" ry="8" x="0" y="0" width="350" height="50" />
            </svg>
            <Geosuggest
              placeholder="Where...?"
              inputClassName="geosuggest-form-control"
              skipSuggest={(s) => s.types.indexOf('political') < 0}
              onSuggestSelect={s => this.onSuggestSelect(s)
                // {
                // this.props.history.push(`/companies`, {
                //   city: s ? s.gmaps.address_components[0].long_name : null,
                //   country: s ? s.gmaps.address_components.pop().long_name : null,
                // })
                // this.props.handleSearch(s ? s.gmaps.address_components[0].long_name : null, s ? s.gmaps.address_components.pop().long_name : null)
              // }
              }
              onKeyPress={event => this.onKeyPress(event)}
            />
          </div>
          <div className="search-choose-date">
            <svg>
              <rect className="rect-search-choose-date" rx="8" ry="8" x="0" y="0" width="185" height="50" />
            </svg>
            <div className="search-btn-text">Choose date</div>
          </div>
          <div className="search-btn">
            <svg>
              <rect className="rect-search-btn" rx="8" ry="8" x="0" y="0" width="185" height="50" />
            </svg>
            <div className="search-btn-text">Search</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return {
    logoutAuth: () => {
      dispatch(logoutAuth())
    },
    searchKeyChanged: (searchKey) => {
      dispatch(searchKeyChanged(searchKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);

