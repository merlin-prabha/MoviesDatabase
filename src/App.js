import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import MovieContext from './context/MovieContext'
import PopularMovies from './components/PopularMovies'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import SearchedMovies from './components/SearchedMovies'
import SingleMovieDetails from './components/SingleMovieDetails'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// write your code here
class App extends Component {
  state = {
    searchInput: '',
    searchResponse: {},
    apiStatus: apiStatusConstants.initial,
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

  onTriggerSearchQuery = async (page = 1) => {
    const {searchInput} = this.state
    const API_KEY = '80e75070ba529ff4c88353c550576d1c'
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const updatedData = this.getUpdatedData(fetchedData)
    this.setState({
      apiStatus: apiStatusConstants.success,
      searchResponse: updatedData,
    })
  }

  onChangeSearchInput = input => {
    this.setState({searchInput: input})
  }

  render() {
    const {searchResponse, searchInput, apiStatus} = this.state

    return (
      <MovieContext.Provider
        value={{
          searchInput,
          apiStatus,
          searchResponse,
          onTriggerSearchQuery: this.onTriggerSearchQuery,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={UpComing} />
          <Route exact path="/search" component={SearchedMovies} />
          <Route exact path="/movie/:id" component={SingleMovieDetails} />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
