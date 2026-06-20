const TopTeams = ({ top3 }) => {
  if (!top3 || top3.length < 3) return null

  return (
    <div className="top-teams">
      {/* 2nd Place */}
      <div className="top-team">
        <div className="top-team__medal">🥈</div>
        <div className="top-team__name">{top3[1].team}</div>
        <div className="top-team__points">{top3[1].points} pts</div>
        <div className="top-team__bar"></div>
      </div>
      
      {/* 1st Place */}
      <div className="top-team">
        <div className="top-team__medal">🥇</div>
        <div className="top-team__name">{top3[0].team}</div>
        <div className="top-team__points">{top3[0].points} pts</div>
        <div className="top-team__bar"></div>
      </div>

      {/* 3rd Place */}
      <div className="top-team">
        <div className="top-team__medal">🥉</div>
        <div className="top-team__name">{top3[2].team}</div>
        <div className="top-team__points">{top3[2].points} pts</div>
        <div className="top-team__bar"></div>
      </div>
    </div>
  )
}

export default TopTeams
