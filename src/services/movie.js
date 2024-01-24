export const getMoviesFromDB = async (search, page) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=9301805a&s=${search.trim()}&page=${page}`)
        const shortMovieData = await res.json()
        /* console.log("short:" ,shortMovieData) */
        const fullMovieData = await getFullMovieFromDB(shortMovieData)
        /* console.log("FullMovies: ",fullMovieData) */
        const formatedMovie = fullMovieData.map( movie => {
          return {
            imdbID: movie.imdbID,
            title: movie.Title,
            released: movie.Released,
            year: movie.Year,
            country: movie.Country,
            type: movie.Type,
            genre: movie.genre,
            director: movie.Director,
            runtime: movie.Runtime,
            poster: movie.Poster,
            ratingIMDB: `${movie.imdbRating}/10`,
            imdbRating: parseFloat(movie.imdbRating)
          }
          })
        /* console.log("FormatedMovie: ",formatedMovie) */
        return formatedMovie
    } catch (error) {
      return []
    }
      
}

const getFullMovieFromDB = async (shorData) =>{
    const fullMovies = shorData.Search?.map( async movie => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=9301805a&i=${movie.imdbID}&plot=full`)
        return await res.json()
        
      } catch (error) {
        return
      }
    })
    return await Promise.all(fullMovies)
  }