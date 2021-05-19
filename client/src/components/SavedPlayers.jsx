import React from 'react';
import PlayerCard from './playerCard.jsx'

class SavedPlayers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='playerList'>
        <PlayerCard/>
        <PlayerCard/>
        <PlayerCard/>
      </div>
    )
  }

}

export default SavedPlayers;