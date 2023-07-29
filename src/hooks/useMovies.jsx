import { useCallback, useEffect, useRef, useState } from "react"
import { getMoviesFromDB } from "../services/movie"

const useMovies = (search )=>{
    const [movies, setMovies] = useState()
    const [sort, setSort] = useState()
    const prevSearch = useRef(search)

    const getMovies = useCallback( async (newSearch)=>{
        console.log(newSearch)
        if(prevSearch.current !== newSearch){
            const moviesFromDB = await getMoviesFromDB(newSearch)
            console.log(moviesFromDB)
            setMovies(moviesFromDB)
            prevSearch.current = newSearch
        }
    }, [])

    const sortMovies = ( (newSort, movies) => {
        console.log("newSort: ",newSort)
        if(search !== " " && newSort === 'name'){
          const movieSorted = [...movies].sort( (a,b) => a.title.localeCompare(b.title))
          setMovies(movieSorted)
        }else if(search !== " " && newSort === 'year'){
          const movieSorted = [...movies].sort( (a,b) => a.year - b.year)
          setMovies(movieSorted)
        }
        else if( search !== " " && newSort === "imdb"){
          const movieSorted = [...movies].sort( (a,b) => b.imdbRating - a.imdbRating)
          setMovies(movieSorted)
        }
        else{
            prevSearch.current = 'reSearch'
            getMovies(search)
        }
      })

      const filterMovies = async (filter ,movies)=>{
        if (filter === "all"){ 
            prevSearch.current = 'reSearch'
            getMovies(search)
        }
        else{
          const moviesFromDB = await getMoviesFromDB(search)
          const filterMovies = moviesFromDB.filter( movie =>  movie.type === filter )
          console.log("Filtrado: ",filterMovies)
          setMovies(filterMovies)
        }
      }

    return ( {movies, getMovies, sortMovies, filterMovies} )
}

export default useMovies