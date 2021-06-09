import React from 'react';
import PlayerCard from './playerCard.jsx'

class SavedPlayers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps) {
    if (this.props.savedPlayers !== oldProps.savedPlayers) {
      this.props.get();
    }
  }

  render() {
    return(
      <div className='playerList' className='myList'>
        {this.props.players.map((player, index) =>
        <PlayerCard key={index} player={player} isSearch={true} get={this.props.get}/>
          )}
      </div>
    )
  }

}

export default SavedPlayers;