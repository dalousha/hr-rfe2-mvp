import React from 'react';
import Search from './Search.jsx';
import $ from 'jquery';
import SavedPlayers from './SavedPlayers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }

    this.getPlayers = this.getPlayers.bind(this);
  }

  componentDidMount() {
    this.getPlayers();
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
        <Search players={this.state.players}/>

        <h3>My List</h3>
        <SavedPlayers/>


      </div>
    )
  }
}

export default App;