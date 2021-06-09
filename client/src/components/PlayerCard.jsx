import React from 'react';
import $ from 'jquery';

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonPPG: '',
      seasonRPG: '',
      seasonAPG: '',
      careerPPG: '',
      careerRPG: '',
      careerAPG: '',
      imgSrc: `https://nba-players.herokuapp.com/players/${this.props.player.lastName}/${this.props.player.firstName}`,
      team: 'NA'
    }
    this.getStats = this.getStats.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.getTeamName = this.getTeamName.bind(this);
  }

  componentDidMount() {
    this.getStats(this.props.player.personId);
    this.getTeamName(this.props.player.teamId);
  }

  componentDidUpdate(oldProps) {
    if (this.props.player.personId !== oldProps.player.personId) {
      this.getStats(this.props.player.personId);
      this.getTeamName(this.props.player.teamId);
      this.getPhoto(this.props.player.lastName, this.props.player.firstName);
    }
  }

  getStats(id) {
    $.ajax({
      method: 'GET',
      url: `http://data.nba.net/prod/v1/2020/players/${id}_profile.json`,
      dataType: 'json',
      success: (data) => {
        var thisSeason = data.league.standard.stats.regularSeason.season[0].total
        var career = data.league.standard.stats.careerSummary
        this.setState({
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

  getTeamName(id) {
    $.ajax({
      method: 'GET',
      url: `http://data.nba.net/10s/prod/v1/2020/teams.json`,
      dataType: 'json',
      success: (data) => {
        for (var i = 0; i < data.league.standard.length; i++) {
          // console.log(data.league.standard[i].teamId, id, data.league.standard[i].tricode)
          if (id === data.league.standard[i].teamId) {
            this.setState({team: data.league.standard[i].tricode})
          }
        }
      }
    })
  }

  getPhoto(lastName, firstName) {
    if (lastName.includes('Jr.')) {
      lastName = lastName.replace(' Jr.','')
    }
    this.setState({imgSrc: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`})
  }

  savePlayer(firstName, lastName, personId) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/players',
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        personId: personId,
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: (res) => {console.log('saved', firstName, ' ', lastName)}
    })
    this.props.get();
  }

  deletePlayer(id) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3000/players',
      data: JSON.stringify({
        personId: id
      }),
      dataType: 'json',
      contentType:'application/json',
      success: (res) => (console.log('deleted', id))
    })
    window.location.reload();
    this.props.get();
  }

  render() {
    return (
      <div className='playerCard'>
        <span className='playerName'>{this.props.player.firstName} {this.props.player.lastName}</span> < br/>
        <span>{this.state.team}</span>
        <div>
          <img className='headshot' src={this.state.imgSrc}></img> <br/>
          <span> Season PPG: {this.state.seasonPPG}</span> <br />
          <span> Season RPG: {this.state.seasonRPG}</span> <br />
          <span> Season APG: {this.state.seasonAPG}</span> <br />
          <span> Career PPG: {this.state.careerPPG}</span> <br />
          <span> Career RPG: {this.state.careerRPG}</span> <br />
          <span> Career APG: {this.state.careerAPG}</span> <br />
        </div> <br />
        {(!this.props.isSearch) ? <button onClick={() => this.savePlayer(this.props.player.firstName, this.props.player.lastName, this.props.player.personId)}>Save</button> : <button onClick={() => this.deletePlayer(this.props.player.personId)}>Remove</button>}

      </div>
    )
  }
}

export default PlayerCard;