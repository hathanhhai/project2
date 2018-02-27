import React, { Component } from 'react';
import Search from './search'
import Sort from './sort'

class Control extends Component {
  render() {
    return (
        <div className="row mt-15">
                <Search onSearch = {this.props.onSearch}/>
                <Sort sortBy={this.props.sortBy} value={this.props.value} onSort= {this.props.onSort} />
        </div>
    );
  }
}

export default Control;
