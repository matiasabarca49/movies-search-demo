import React from "react"
import './Movies.css'

const Movies = ({ movies }) =>{
    
    return(
        
        <section className="showMoviesCont">
            {movies.map( (movie) =>(
                <div key={movie.imdbID} className="showMovies">
                    <h4 style={{height: "50px",margin: "10px 0", textAlign: "center", fontSize:"1.2rem"}}>{movie.title}</h4>
                    <div style={{display: "flex", flexDirection:"column", boxShadow: "black 0px 0px 15px 2px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"}}>
                        <div className="showMovies__poster">
                            <img src={movie.poster} alt={`view poster of ${movie.title}`} />
                            <div className="showMovies__typeAndYear">
                                <h4>{movie.year}</h4>
                                <h4>{`${movie.type[0].toUpperCase()}${movie.type.slice(1, movie.type.length)}`}</h4>
                            </div>   
                        </div>
                        <div className="showMovies__rating">
                            <h4>{movie.runtime}</h4>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h4 style={{fontSize: "1.2rem"}}>{movie.ratingIMDB}</h4>
                                <img src="./img/imdb.png" alt="imdb" /> 
                            </div>
                        </div>
                    </div>
                    {/* <h4>{movie.genre}</h4>
                    <h4>{movie.country}</h4>
                    <h4>{movie.director}</h4> */}

                </div>
            ) )}
        </section>
    )
}

export default Movies