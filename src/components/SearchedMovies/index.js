import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import MovieContext from '../../context/MovieContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchedMovies = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found</h1>
      <p>Search Again</p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse

    if (results.length === 0) {
      return renderEmptyView()
    }
    return (
      <ul className="movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} details={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <MovieContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value
        console.log(searchResponse)

        return (
          <>
            <NavBar />
            <div className="route-page-body">
              {renderSearchResultViews(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default SearchedMovies
