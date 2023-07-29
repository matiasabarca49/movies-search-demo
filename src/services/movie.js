export const getMoviesFromDB = async (search) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=9301805a&plot=full&s=${search}`)
      const shortMovieData = await res.json()
      const fullMovieData = await getFullMovieFromDB(shortMovieData)
      console.log(fullMovieData)
      const movieFormated = fullMovieData.map( movie => {
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
      return movieFormated
    } catch (error) {
      console.log(error)
      return []
    }
      
}

const getFullMovieFromDB = async (shorData) =>{
    const fullMovies = shorData.Search?.map( async movie => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=9301805a&i=${movie.imdbID}&plot=full`)
      return await res.json()
    })
    return await Promise.all(fullMovies)
  }