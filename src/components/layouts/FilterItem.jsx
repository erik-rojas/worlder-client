import React, { Component } from "react"
import PropTypes from 'prop-types'

import '../../assets/scss/filter_item.scss'

class FilterItem extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  onFilterSelected = (filterName) => {
    const { onFilterSelected } = this.props

    onFilterSelected(filterName)
  }

  render() {
    const { imgUrl, filterName, onSelected } = this.props

    return (
      <div className={"filter-item " + (onSelected ? 'selected' : '')} onClick={e => this.onFilterSelected(filterName)}>
        <img src={imgUrl} alt={filterName} />
        {filterName}
      </div>
    );
  }
}

FilterItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterSelected: PropTypes.func.isRequired,
  onSelected: PropTypes.bool
}

FilterItem.defaultProps = {
  onSelected: false
}

export default FilterItem
