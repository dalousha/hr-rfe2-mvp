import React from 'react';
import $ from 'jquery';
import PlayerCard from './PlayerCard.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    }

    this.getStats = this.getStats.bind(this);
  }

  componentDidUpdate(oldProps) {
    if (this.props.searchResults !== oldProps.searchResults) {
      this.getStats(this.props.searchResults);
    }
  }

  getStats(players) {
    var stats = [];
    for (var i = 0; i < players.length; i++) {
      $.ajax({
        method: 'GET',
        url: `http://data.nba.net/prod/v1/2020/players/${players[i].personId}_profile.json`,
        dataType: 'json',
        success: (data) => {
          var thisSeason = data.league.standard.stats.regularSeason.season[0].total
          var career = data.league.standard.stats.careerSummary
          stats.push(
            {
              seasonPPG: thisSeason.ppg,
              seasonRPG: thisSeason.rpg,
              seasonAPG: thisSeason.apg,
              careerPPG: career.ppg,
              careerRPG: career.rpg,
              careerAPG: career.apg
            })
        }
      })
    }
    console.log(stats)
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
          <PlayerCard player={player} key={index}/>
        )}
      </div>
    )
  }

}

export default SearchResults;