import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCarousel from '../../components/header/MovieCarousel';
import { Box, TextField, Typography, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// This is the home page component that displays the Movie Carousel, Now Playing,
// Coming Soon, and search bar
const Home = () => {

    // STATE TRIGGER
    const [isLoading, setIsLoading] = useState(false);
    const [triggerGetData, setTriggerGetData] = useState(0);

    // MOVIES SHOWING NOW
    const [moviesShowingNow, setMoviesShowingNow] = useState([]);
    const [moviesShowingNowFiltered, setMoviesShowingNowFiltered] = useState([]);
    const [moviesShowingNowSearchCategory, setMoviesShowingNowSearchCategory] = useState('title');
    const [moviesShowingNowSearchBarContent, setMoviesShowingNowSearchBarContent] = useState('');

    // MOVIES COMING SOON
    const [moviesComingSoon, setMoviesComingSoon] = useState([]);
    const [moviesComingSoonFiltered, setMoviesComingSoonFiltered] = useState([]);
    const [moviesComingSoonSearchCategory, setMoviesComingSoonSearchCategory] = useState('title');
    const [moviesComingSoonSearchBarContent, setMoviesComingSoonSearchBarContent] = useState('');

    // NAVIGATON
    const navigate = useNavigate();

    const goToMoviePage = (movieId) => {
        navigate({
            pathname: 'movie/',
            search: '?movieId=' + movieId
        });
    };

    const handleSearchMoviesShowingNow = (event) => {
        setMoviesShowingNowSearchBarContent(event.target.value);
    };

    const handleSearchMoviesComingSoon = (event) => {
        setMoviesComingSoonSearchBarContent(event.target.value);
    };

    const handleCategorySelectMoviesShowingNow = (event) => {
        setMoviesShowingNowSearchCategory(event.target.value);
    }

    const handleCategorySelectMoviesComingSoon = (event) => {
        setMoviesComingSoonSearchCategory(event.target.value);
    }

    useEffect(() => {

        const fetchMoviesShowingNow = async () => {
            setIsLoading(true);
            const fetchMoviesShowingNowResponse = await axios.get('http://localhost:3001/api/movie/fetch-all/status/showing-now');
            setMoviesShowingNow(fetchMoviesShowingNowResponse.data);
            setMoviesShowingNowFiltered(fetchMoviesShowingNowResponse.data);
            setIsLoading(false);
        };

        const fetchMoviesComingsoon = async () => {
            setIsLoading(true);
            const fetchMoviesComingSoonResponse = await axios.get('http://localhost:3001/api/movie/fetch-all/status/coming-soon');
            setMoviesComingSoon(fetchMoviesComingSoonResponse.data);
            setMoviesComingSoonFiltered(fetchMoviesComingSoonResponse.data);
            setIsLoading(false);
        };

        fetchMoviesShowingNow().catch(console.error);
        fetchMoviesComingsoon().catch(console.error);

    }, [triggerGetData]);

    useEffect(() => {

        if (moviesShowingNowSearchCategory === 'title') {
            const moviesShowingNowSearchResult = moviesShowingNow.filter((movie) => {
                return movie.title.toLowerCase().includes(moviesShowingNowSearchBarContent);
            })
            setMoviesShowingNowFiltered(moviesShowingNowSearchResult);
        } else if (moviesShowingNowSearchCategory === 'category') {
            const moviesShowingNowSearchResult = moviesShowingNow.filter((movie) => {
                return movie.category.toLowerCase().includes(moviesShowingNowSearchBarContent);
            })
            setMoviesShowingNowFiltered(moviesShowingNowSearchResult);
        }
        
    }, [moviesShowingNowSearchBarContent]);

    useEffect(() => {

        if (moviesComingSoonSearchCategory === 'title') {
            const moviesComingSoonSearchResult = moviesComingSoon.filter((movie) => {
                return movie.title.toLowerCase().includes(moviesComingSoonSearchBarContent);
            });
            setMoviesComingSoonFiltered(moviesComingSoonSearchResult);
        } else if (moviesComingSoonSearchCategory === 'category') {
            const moviesComingSoonSearchResult = moviesComingSoon.filter((movie) => {
                return movie.category.toLowerCase().includes(moviesComingSoonSearchBarContent);
            });
            setMoviesComingSoonFiltered(moviesComingSoonSearchResult);
        }
        
    }, [moviesComingSoonSearchBarContent]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', m: 'auto' }}>
            <MovieCarousel />
            <Typography sx={{ fontSize: '3vw', textAlign: 'center', mt: '4vh', mb: '2vh' }}>Showing Now</Typography>
            <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                <Typography>Search: </Typography>
                <TextField onChange={handleSearchMoviesShowingNow} sx={{ width: '20vw' }}></TextField>
                <TextField select value={moviesShowingNowSearchCategory} onChange={handleCategorySelectMoviesShowingNow}>
                    <MenuItem value='title'>By Title</MenuItem>
                    <MenuItem value='category'>By Category</MenuItem>
                </TextField>
            </Box>
            <Grid container spacing={3} sx={{ width: '60vw', display: 'inline-flex', m: 'auto', justifyContent: 'center', mt: '5vh' }}>
                {moviesShowingNowFiltered.length > 0 ? moviesShowingNowFiltered.map((movie) => {
                    return (
                        <Grid item key={moviesShowingNowFiltered.indexOf(movie)} sx={{ width: '10vw', mb: '5vh' }} xs={3}>
                            <Typography sx={{ textAlign: 'center' }}><strong>{movie.title}</strong></Typography>
                            <Box sx={{ m: 'auto' }}>
                                <img
                                    onClick={() => goToMoviePage(movie._id)}
                                    src={movie.moviePosterUrl}
                                    style={{
                                        width: '8vw',
                                        height: '22vh',
                                        display: 'block',
                                        margin: 'auto',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                            <Typography sx={{ textAlign: 'center' }}>Rating: {movie.rating}</Typography>
                            <a target='_blank' href={movie.trailerUrl}>
                                <Typography sx={{ textAlign: 'center' }}>Trailer</Typography>
                            </a>
                        </Grid>
                    )
                }) : <Typography>No movies found.</Typography>}
            </Grid>
            <Typography sx={{ fontSize: '3vw', textAlign: 'center', mt: '4vh', mb: '2vh' }}>Coming Soon</Typography>
            <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                <Typography>Search: </Typography>
                <TextField onChange={handleSearchMoviesComingSoon} sx={{ width: '20vw' }}></TextField>
                <TextField select value={moviesComingSoonSearchCategory} onChange={handleCategorySelectMoviesComingSoon}>
                    <MenuItem value='title'>By Title</MenuItem>
                    <MenuItem value='category'>By Category</MenuItem>
                </TextField>
            </Box>
            <Grid container spacing={3} sx={{ width: '60vw', display: 'inline-flex', m: 'auto', justifyContent: 'center', mt: '5vh' }}>
                {moviesComingSoonFiltered.length > 0 ? moviesComingSoonFiltered.map((movie) => {
                    return (
                        <Grid item key={moviesComingSoonFiltered.indexOf(movie)} sx={{ width: '10vw', mb: '5vh' }} xs={3}>
                            <Typography sx={{ textAlign: 'center' }}><strong>{movie.title}</strong></Typography>
                            <Box sx={{ m: 'auto' }}>
                                <img
                                    onClick={() => goToMoviePage(movie._id)}
                                    src={movie.moviePosterUrl}
                                    style={{
                                        width: '8vw',
                                        height: '22vh',
                                        display: 'block',
                                        margin: 'auto',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                            <Typography sx={{ textAlign: 'center' }}>Rating: {movie.rating}</Typography>
                            <a target='_blank' href={movie.trailerUrl}>
                                <Typography sx={{ textAlign: 'center' }}>Trailer</Typography>
                            </a>
                        </Grid>
                    )
                }) : <Typography>No movies found.</Typography>}
            </Grid>
        </Box>
    );
};

export default Home;