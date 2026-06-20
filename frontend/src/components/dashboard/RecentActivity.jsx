const activities = [
  {
    id: 1,
    text: 'Resultado cargado: <strong>Hawks 72 - 68 Tigers</strong>',
    time: 'Hace 2 horas',
    color: 'blue',
  },
  {
    id: 2,
    text: 'Nuevo jugador agregado a <strong>Lions</strong>',
    time: 'Hace 4 horas',
    color: 'green',
  },
  {
    id: 3,
    text: 'Partido programado: <strong>Eagles vs Hawks</strong>',
    time: 'Hace 6 horas',
    color: 'orange',
  },
  {
    id: 4,
    text: 'Equipo <strong>Tigers</strong> actualizado',
    time: 'Hace 1 día',
    color: 'purple',
  },
  {
    id: 5,
    text: 'Nuevo partido creado: <strong>Lions vs Bears</strong>',
    time: 'Hace 1 día',
    color: 'blue',
  },
  {
    id: 6,
    text: 'Jugador eliminado de <strong>Wolves</strong>',
    time: 'Hace 2 días',
    color: 'orange',
  },
]

const RecentActivity = () => {
  return (
    <section className="activity" id="recent-activity">
      <h2 className="activity__title">Actividad Reciente</h2>
      <div className="activity__card">
        <ul className="activity__list">
          {activities.map((activity) => (
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
          ))}
        </ul>
      </div>
    </section>
  )
}

export default RecentActivity
