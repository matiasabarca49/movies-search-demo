import React from 'react'
import { useCallback, useRef, useState } from 'react'
import './NavSearch.css'
import Movies from '../Movies/Movies'
import debounce from "just-debounce-it";
import useSearch from '../../hooks/useSearch';
import useMovies from '../../hooks/useMovies';

const NavSearch = () => {

    const {search, setSearch, error, isFirstSearch} = useSearch()
    const {movies, getMovies, sortMovies, filterMovies} = useMovies(search)
    const [auto, setAuto] = useState(true)
  
    const debounceMovies = useCallback(debounce( search => {
        console.log({search: search})
        getMovies(search)
        isFirstSearch.current= true
    }, 500),[])

    const handleSearch = (e)=>{
        setSearch(e.target.value)
        auto && debounceMovies(search)
    }

    const handleSort = (newSort)=>{
        sortMovies(newSort, movies)
    }

    const handleFilter = (newFilter) =>{
        filterMovies(newFilter, movies)
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        getMovies(search)
    }

    const handleAuto = (e)=>{
        console.log(e.target.checked)
        e.target.checked? setAuto(false) : setAuto(true)
        isFirstSearch.current= true
    }

  return (
    <div>
        <main className='page'>
      <h1>Buscador de peliculas</h1>
      <form className='page__search' action="" onSubmit={ handleSubmit }>
        <input type="text" placeholder='Avengers, Matrix...' onChange={(e)=> handleSearch(e) } value={search} required />
        <div>
          <label htmlFor="year">Año</label>
          <input type='radio' name='radioSort' id='sortYear' onChange={()=> handleSort('year')}/>
        </div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type='radio' name='radioSort' id='sortName' onChange={()=> handleSort('name')}/>
        </div>
        <div>
          <label htmlFor="sortImdb">IMDB</label>
          <input type='radio' name='radioSort' id='sortImdb' onChange={()=> handleSort('imdb')}/>
        </div>
        <div>
          <label htmlFor="def">Sin Ordenar</label>
          <input type='radio' name='radioSort' id='sortDefault' onChange={()=> handleSort('')}/>
        </div>
        <div>
          <label htmlFor="filter">Tipo:</label>
          <select name="" id="" onChange={(e)=> handleFilter(e.target.value)}>
              <option value="all">Todos</option>
              <option value="game">Juego</option>
              <option value="series">Serie</option>
              <option value="movie">Pelicula</option>
          </select>
        </div>
        <input type="submit" value="Buscar" />
        <div>
          <label htmlFor="">No automático</label>
        <input type="checkbox" onChange={(e) => handleAuto(e) } />
        </div>
      </form>
      <p style={{color: "red"}}>{error}</p>
      { movies && <Movies  movies = { movies } />} 
    </main>
    </div>
  )
}

export default NavSearch