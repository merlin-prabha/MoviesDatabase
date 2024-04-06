import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {details} = props
  const {id, title, posterPath, voteAverage} = details

  return (
    <li className="each-movie">
      <div className="movie-card">
        <img src={posterPath} alt={title} className="poster-img" />
        <div className="text-button-container">
          <div className="text-container">
            <p className="movie-title">{title}</p>
            <p className="movie-title">Rating: {voteAverage}</p>
          </div>
          <Link to={`/movie/${id}`} className="link-btn">
            <button className="view-details-btn" type="button">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default MovieCard
