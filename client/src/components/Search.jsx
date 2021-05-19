import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    }
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    this.setState({
      filter: e.target.value
    })
    console.log(this.state.filter)
  }

  render() {
    return (
      <div>
        <input className="Search" type="text" placeholder="Search for a Player" value={this.state.filter} onChange={this.onSearchChange} ></input>
        <button>Search</button>
      </div>
    )
  }
}

export default Search;