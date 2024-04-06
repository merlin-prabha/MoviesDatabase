import React from 'react'

const MovieContext = React.createContext({
  searchResponse: {},
  onTriggerSearchQuery: () => {},
})

export default MovieContext
