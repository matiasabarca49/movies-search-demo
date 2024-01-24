import { useCallback, useEffect, useRef, useState } from "react"
import { getMoviesFromDB } from "../services/movie"

const useMovies = (search )=>{
    const [movies, setMovies] = useState()
    const [page, setPage] = useState(1)
    const [notSearch, setNotSearch] = useState(false)
    const prevSearch = useRef(search)

    const getMovies = useCallback( async (newSearch, nextPage)=>{
        const moviesFromDB = await getMoviesFromDB(newSearch, nextPage)
       /*  console.log("Peliculas en getMovies: ",moviesFromDB) */
        setMovies(moviesFromDB)
        prevSearch.current = newSearch
        moviesFromDB.length === 0  ? setNotSearch(true) : setNotSearch(false)
    }, [])

    const sortMovies = ( (newSort) => {
        /* console.log("newSort: ",newSort) */
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
            getMovies(search, 1)
        }
      })

      const filterMovies = async (filter)=>{
        if (filter === "all"){ 
            prevSearch.current = 'reSearch'
            getMovies(search, 1)
        }
        else{
          const moviesFromDB = await getMoviesFromDB(search)
          const filterMovies = moviesFromDB.filter( movie =>  movie.type === filter )
          /* console.log("Filtrado: ",filterMovies) */
          setMovies(filterMovies)
        }
      }

      const nextPage = ()=>{
        getMovies(search, page + 1)
        setPage(page + 1)
      }

    return ( {movies, getMovies, sortMovies, filterMovies, notSearch, nextPage} )
}

export default useMovies