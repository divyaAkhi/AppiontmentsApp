// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {objectDetails, starFavorite} = props
  const {id, title, dateTime, isFavorite} = objectDetails
  const classStarStyle = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClick = () => {
    starFavorite(id)
  }
  return (
    <li className="list-item card-container">
      <div className="star-name">
        <p className="name">{title}</p>
        <button
          type="button"
          onClick={starClick}
          className="buttonStar"
          data-testid="star"
        >
          <img src={classStarStyle} alt="star" className="star" />
        </button>
      </div>
      <p className="date">{dateTime}</p>
    </li>
  )
}

export default AppointmentItem
