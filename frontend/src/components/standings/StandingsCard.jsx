const StandingsCard = ({ team, onView }) => {
  return (
    <div className="standing-card" onClick={() => onView(team)}>
      <div className="standing-card__pos">
        {team.position}
      </div>
      <div className="standing-card__info">
        <span className="standing-card__team">{team.team}</span>
        <span className="standing-card__stats">
          PJ: {team.played} | G: {team.wins} | Dif: {team.difference > 0 ? `+${team.difference}` : team.difference}
        </span>
      </div>
      <div className="standing-card__points">
        {team.points} pts
      </div>
    </div>
  )
}

export default StandingsCard
