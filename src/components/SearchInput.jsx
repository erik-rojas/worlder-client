import React, { Component } from 'react';

import Geosuggest from "react-geosuggest";
class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='search-input' >
                <fieldset className="field-container">
                    <Geosuggest
                        placeholder="Enter City"
                        inputClassName="form-control"
                        skipSuggest={(s) => s.types.indexOf('political') < 0}
                        onSuggestSelect={s => {
                            this.props.history.push(`/companies`, {
                                city: s ? s.gmaps.address_components[0].long_name : null,
                                country: s ? s.gmaps.address_components.pop().long_name : null,
                            })
                            // this.props.handleSearch(s ? s.gmaps.address_components[0].long_name : null, s ? s.gmaps.address_components.pop().long_name : null)
                        }}
                    />
                    <div className="icons-container">
                        <div className="icon-search"></div>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default SearchInput;
