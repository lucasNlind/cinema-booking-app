import axios from 'axios';
import * as dayjs from 'dayjs';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';




const MoviePage = () => {

    const navigate = useNavigate();
    const goToBookingPage = () => {
        navigate('/ticketSelect')
    };

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [triggerGetData, setTriggerGetData] = useState(0);
    const [trailerEmbedId, setTrailerEmbedId] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const getEmbedId = (trailerUrl) => {
        console.log('movie: ', movie, 'trailerUrl: ', trailerUrl);
        setTrailerEmbedId(trailerUrl.split('=')[1]);
    }

    useEffect(() => {

        const fetchMovie = async () => {
            setIsLoading(true);
            const movieId = searchParams.get('movieId');
            const fetchMovieInstance = await axios.get('http://localhost:3001/api/movie/fetch/' + movieId);
            setMovie(fetchMovieInstance.data);
            setTrailerEmbedId(fetchMovieInstance.data.trailerUrl.split('=')[1]);
            setIsLoading(false);
        }

        fetchMovie().catch(console.error);
    
    }, []);

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '100vw', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ mt: '4vh', mb: '4vh' }}><strong>{movie.title}</strong></Typography>
            {trailerEmbedId !== '' ? <iframe className='hero-trailer' width='880' height='515' src={`https://www.youtube.com/embed/${trailerEmbedId}`} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe>: ''}
            <Typography sx={{ mb: '2vh', mt: '2vh' }}><strong>Category: </strong> {movie.category}</Typography>
                <Typography sx={{ mr: '1vw'}}><strong>Cast: </strong></Typography>
                {movie.cast !== undefined ? movie.cast.map((castMember) => {
                    return (
                        <Typography>{castMember}</Typography>
                    )
                }) : ''}
            <Typography sx={{ mr: '1vw',  mt: '2vh' }}><strong>Director: </strong>{movie.director}</Typography>
            <Typography sx={{ mr: '1vw',  mt: '2vh' }}><strong>Producer: </strong>{movie.producer}</Typography>
            <Typography sx={{ mt: '2vh' }}><strong>Summary: </strong> <br></br> {movie.summary}</Typography>
            <Typography sx={{ mt: '2vh' }}><strong>Reviews: </strong></Typography>
            {movie.reviews !== undefined ? movie.reviews.map((review) => {
                return (
                    <Typography>{review}</Typography>
                )
            }) : ''}
            <Typography sx={{ mt: '2vh', mb: '2vh' }}><strong>Rating: </strong>{movie.rating}</Typography>
            <img
                src={movie.moviePosterUrl}
                style={{
                    width: '8vw',
                    height: '22vh',
                    display: 'block',
                    margin: 'auto',
                    cursor: 'pointer'
                }}
            />
            <Typography sx={{ mt: '2vh' }}><strong>Show Times: </strong></Typography>
            {movie.showDates !== undefined ? movie.showDates.map((showDate) => {
                return (
                    <Box sx={{ display: 'inline-flex', m: 'auto'}}>
                        <Typography>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</Typography> <br></br>
                        <Button 
                            onClick={() => goToBookingPage()}
                            >
                            BOOK
                        </Button>
                    </Box>
                )
            }) : ''}



        </Box>
    );
};

export default MoviePage;
