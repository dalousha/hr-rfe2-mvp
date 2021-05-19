import React from 'react';

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='playerCard'>
        <div>
          Player Name
        </div>
        <div>
          Player Stats
        </div>
      </div>
    )
  }
}

export default PlayerCard;