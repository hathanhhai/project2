import React, { Component } from 'react';


class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }
    
    onChange = (e)=>{
        this.setState({keyword:e.target.value})
    }

    onSearch = ()=>{
        this.props.onSearch(this.state.keyword);
    }
  render() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập từ khóa..."
                    onChange={this.onChange}
                    value={this.state.keyword}
                    name="search"
                 />
                <span className="input-group-btn">
                            <button className="btn btn-primary" type="button"
                            onClick = {this.onSearch}
                            >
                                <span className="fa fa-search mr-5"></span>Tìm
                </button>
                </span>
            </div>
    </div>
    );
  }
}

export default Search;
