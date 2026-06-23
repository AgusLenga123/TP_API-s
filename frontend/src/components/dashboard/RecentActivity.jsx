const RecentActivity = ({ activities = [] }) => {
  return (
    <section className="activity" id="recent-activity">
      <h2 className="activity__title">Actividad Reciente</h2>
      <div className="activity__card">
        <ul className="activity__list">
          {activities.length === 0 ? (
            <li className="activity__item" style={{color: 'var(--color-text-secondary)'}}>No hay actividad reciente.</li>
          ) : (
            activities.map((activity) => (
            <li className="activity__item" key={activity.id}>
              <div className={`activity__dot activity__dot--${activity.color}`}></div>
              <div className="activity__info">
                <p
                  className="activity__text"
                  dangerouslySetInnerHTML={{ __html: activity.text }}
                />
                <span className="activity__time">{activity.time}</span>
              </div>
            </li>
          )))}
        </ul>
      </div>
    </section>
  )
}

export default RecentActivity
