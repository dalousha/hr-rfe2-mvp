import React from 'react';
import Search from './Search.jsx';
import $ from 'jquery';
import SavedPlayers from './SavedPlayers.jsx';
import SavedTeams from './SavedTeams.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      teams: [],
      savedPlayers: []
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getSavedPlayers = this.getSavedPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getData = this.getData.bind(this);
    this.refreshSavedPlayers = this.refreshSavedPlayers.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getSavedPlayers() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/players',
        contentType: 'application/json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  refreshSavedPlayers() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/players',
        contentType: 'application/json',
        success: (data) => {
          this.setState({
            savedPlayers: data
          });
        }
      })
    })
  }

  getPlayers() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `http://data.nba.net/10s/prod/v1/2020/players.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })

  }

  getTeams() {
    return new Promise ((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: `http://data.nba.net/10s/prod/v1/2020/teams.json`,
        dataType: 'json',
        success: (data) => {
          resolve(data);
        }
      })
    })
  }

  getData() {
    Promise.all([
      this.getPlayers(),
      this.getTeams(),
      this.getSavedPlayers()
    ]).then(responses => {
      console.log(responses);
      this.setState({
        players: responses[0].league.standard,
        teams: responses[1].league.standard,
        savedPlayers: responses[2]
      })
    })
  }

  render() {
    return(
      <div>
        <h1 className='bigHeader'>NBA STAT TRACKER</h1>
        <h3>Search</h3>
        <Search players={this.state.players} get={this.refreshSavedPlayers}/>

        <h3>My Players</h3>
        <SavedPlayers players={this.state.savedPlayers} get={this.refreshSavedPlayers}/>

        <h3>My Teams</h3>
        <SavedTeams />


      </div>
    )
  }
}

export default App;