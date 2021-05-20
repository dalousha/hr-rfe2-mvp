import React from 'react';
import $ from 'jquery';
import PlayerCard from './PlayerCard.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    if (this.props.searchResults.length === 0) {
      return (
        <div>
          No Search Results
        </div>
      )
    }
    return (
      <div className="playerList">
        {this.props.searchResults.map((player, index) =>
          <PlayerCard player={player} key={index} get={this.props.get}/>
        )}
      </div>
    )
  }

}

export default SearchResults;