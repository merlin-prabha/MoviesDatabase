import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

class PopularMovies extends Component {
  state = {isLoading: true, popularMovieResponse: {}}

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesData = async (page = 1) => {
    const API_KEY = '80e75070ba529ff4c88353c550576d1c'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const updatedData = this.getUpdatedData(fetchedData)
    this.setState({isLoading: false, popularMovieResponse: updatedData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderMovies = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul className="movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} details={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="body-container">
          {isLoading ? this.renderLoadingView() : this.renderMovies()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesData}
        />
      </>
    )
  }
}

export default PopularMovies
