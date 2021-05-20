import React from 'react';
import Search from './Search.jsx';
import $ from 'jquery';
import SavedPlayers from './SavedPlayers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      savedPlayers: []
    }

    this.getPlayers = this.getPlayers.bind(this);
    this.getSavedPlayers = this.getSavedPlayers.bind(this);
  }

  componentDidMount() {
    this.getPlayers();
    this.getSavedPlayers();
  }

  getSavedPlayers() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/players',
      contentType: 'application/json',
      success: (data) => {
        console.log(data)
        this.setState({
          savedPlayers: data
        })
      }
    })
  }



  getPlayers() {
    $.ajax({
      method: 'GET',
      url: `http://data.nba.net/10s/prod/v1/2020/players.json`,
      dataType: 'json',
      success: (data) => {
        this.setState({
          players: data.league.standard
        })
      }
    })
  }

  render() {
    return(
      <div>
        <h1 className='bigHeader'>NBA STAT TRACKER</h1>
        <h3>Search</h3>
        <Search players={this.state.players} get={this.getSavedPlayers}/>

        <h3>My List</h3>
        <SavedPlayers players={this.state.savedPlayers} get={this.getSavedPlayers}/>


      </div>
    )
  }
}

export default App;