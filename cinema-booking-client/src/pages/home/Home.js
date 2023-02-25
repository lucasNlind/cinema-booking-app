import React from 'react';
import MovieCarousel from '../../components/header/MovieCarousel';
import MoviesList from '../../components/movieList/MoviesList';
import './home.css';

// This is the home page component that displays the Movie Carousel, Now Playing,
// Coming Soon, and search bar
const Home = () => {
    return (
        <div className="home-wrap">

            <div className="header">
                <MovieCarousel />
            </div>

            <div className="search-block">
                <input className="search-bar" type="text" placeholder="Search..."/>
                <button className="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            
            <h1 className="movie-title"><span>Now Playing</span></h1>

            <div className="list-titles">
                <MoviesList />
            </div>

            <h1 className="movie-title"><span>Coming Soon</span></h1>

            <div className="list-titles">
                <MoviesList />
            </div>

        </div>
    );
};

export default Home;