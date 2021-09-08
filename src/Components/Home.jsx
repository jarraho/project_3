import React from 'react'
import './Home.css'
import MovieCard from './movieCard'
import SearchMovies from './searchMovies'

//The home Page
function Home() {
    /* Write your own code here */
    return (
        <div>
            <SearchMovies/>
            <MovieCard/>
        </div>
    )
}

export default Home
