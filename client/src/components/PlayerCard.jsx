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
      imgSrc: `https://nba-players.herokuapp.com/players/${this.props.player.lastName}/${this.props.player.firstName}`
    }

  }

  componentDidMount() {
    this.getStats(this.props.player.personId);
  }

  componentDidUpdate(oldProps) {
    if (this.props.player.lastName !== oldProps.player.lastName || this.props.player.firstName !== oldProps.player.firstName) {
      this.getPhoto(this.props.player.lastName, this.props.player.firstName);
    }
    if (this.props.player.personId !== oldProps.player.personId) {
      this.getStats(this.props.player.personId);
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

  getPhoto(lastName, firstName) {
    this.setState({imgSrc: `https://nba-players.herokuapp.com/players/${this.props.player.lastName}/${this.props.player.firstName}`})
  }

  render() {
    return (
      <div className='playerCard'>
        {this.props.player.firstName} {this.props.player.lastName}
        <div>
          <img className='headshot' src={this.state.imgSrc}></img> <br/>
          <span> Season PPG: {this.state.seasonPPG}</span> <br />
          <span> Season RPG: {this.state.seasonRPG}</span> <br />
          <span> Season APG: {this.state.seasonAPG}</span> <br />
          <span> Career PPG: {this.state.careerPPG}</span> <br />
          <span> Career RPG: {this.state.careerRPG}</span> <br />
          <span> Career APG: {this.state.careerAPG}</span> <br />

        </div>
        <button>Save</button>
      </div>
    )
  }
}

export default PlayerCard;