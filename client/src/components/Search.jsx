import React from 'react';
import SearchResults from './SearchResults.jsx';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      searchResults: [],
      fromSearch: true
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchChange(e) {
    this.setState({
      filter: e.target.value
    })
  }

  onSearchClick() {
    if (this.state.filter.length > 2) {
      var searchedPlayers = this.props.players.filter(player => (player.firstName + ' ' + player.lastName).toLowerCase().includes(this.state.filter.toLowerCase()))
      this.setState({
        searchResults: searchedPlayers
      })
    } else {
      alert('Seach must be have at least 3 letters')
      this.setState({
        searchResults: []
      })
    }
  }


  render() {
    return (
      <div>
        <input className="Search" type="text" placeholder="Search for a Player" value={this.state.filter} onChange={this.onSearchChange} ></input>
        <button onClick={this.onSearchClick}>Search</button>
        <br />
        <SearchResults searchResults={this.state.searchResults} isSearch={this.state.fromSearch} get={this.props.get}/>
      </div>
    )
  }
}

export default Search;