import React from 'react'
import { useCallback, useRef, useState } from 'react'
import './NavSearch.css'
import Movies from '../Movies/Movies'
import debounce from "just-debounce-it";
import useSearch from '../../hooks/useSearch';
import useMovies from '../../hooks/useMovies';
import ToggleSwitch from '../globals/toggleSwitch/ToggleSwitch';

const NavSearch = () => {

    const {search, setSearch, error, isFirstSearch} = useSearch()
    const {movies,page, getMovies, sortMovies, filterMovies, notSearch, prevPage, nextPage} = useMovies(search)
    const [auto, setAuto] = useState(true)
  
    const debounceMovies = useCallback(debounce( search => {
        /* console.log("debounce: ",{search: search}) */
        getMovies(search, 1)
        isFirstSearch.current= true
    }, 300),[])

    const handleSearch = (e)=>{
        setSearch(e.target.value)
        auto && debounceMovies(search)
    }

    const handleSort = (newSort)=>{
        sortMovies(newSort)
    }

    const handleFilter = (newFilter) =>{
        filterMovies(newFilter)
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        getMovies(search, 1)
    }

    const handleAuto = (e)=>{
        /* console.log(e.target.checked) */
        e.target.checked? setAuto(false) : setAuto(true)
        isFirstSearch.current= true
    }

    const handlePage = (opt)=>{
      console.log("cambiar Página")
      if(opt === 1){
        nextPage()
      }
      else{
        prevPage()
      }
    }

  return (
    <div>
      <main className='page'>
        <h1>Buscador de Películas</h1>
        <form className='page__search' action="" onSubmit={ handleSubmit }>
          <input type="text" placeholder='Avengers, Matrix...' onChange={(e)=> handleSearch(e) } value={search} required style={{textAlign: "center", border: "none", borderRadius: "5px", backgroundColor: "#ebeff3"}}/>
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
            <select name="" id="" onChange={(e)=> handleFilter(e.target.value)}>
                <option value="all">Todos</option>
                <option value="game">Juego</option>
                <option value="series">Serie</option>
                <option value="movie">Pelicula</option>
            </select>
            <label htmlFor="filter">Tipo:</label>
          </div>
          <button style={{marginLeft: "2rem",border: "none", background: "transparent"}}><img src="./img/buscar.png" alt="search" style={{width: "30px"}} /></button>
          <ToggleSwitch label="No Automatico" event={e => handleAuto(e)} />
        </form>
        <p style={{color: "red"}}>{error}</p>
        {notSearch && <p> No se encontró la busqueda </p>}
        {movies &&
          <div className='setPagesStyle'>
            <button onClick={ ()=> handlePage(-1) } style={{border:"none", backgroundColor:"transparent"}}><img src='./img/prev.png' style={{width:"25px"}}/></button>
            <div style={{fontSize: "1.5rem"}}>{page}</div>
            <button onClick={ ()=> handlePage(1)} style={{border:"none", backgroundColor:"transparent"}}><img src='./img/prev.png' style={{width:"25px", transform: "rotate(180deg)"}}/></button>   
          </div>
        }
        { movies 
          ? <Movies  movies = { movies } />
          : <h3 style={{color:"#796779"}}>Busqueda una pelicula....</h3>}
    </main>
    </div>
  )
}

export default NavSearch