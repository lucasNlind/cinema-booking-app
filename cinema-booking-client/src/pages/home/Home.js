import React from 'react';
import {Link} from 'react-router-dom';
import MovieCarousel from '../../components/header/MovieCarousel';
import MoviesList from '../../components/movieList/MoviesList';
import './home.css';

const Home = () => {
    return (
        <div className="homepg">
            <div className="header">
                <MovieCarousel />
            </div>

            <div className="searchBar"><input type="text" placeholder="Search..."/>
            <button className="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            
        <h1 className="nowPlaying"><span>Now Playing</span></h1>
            <div className="nowPlayingWrap">
                <MoviesList />
            </div>

        <h1 className="comingSoon"><span>Coming Soon</span></h1>
            <div className="comingSoonWrap">
                <MoviesList />
            </div>

        </div>

        
    );
};

export default Home;