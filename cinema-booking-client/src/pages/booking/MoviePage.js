import axios from 'axios';
import * as dayjs from 'dayjs';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MoviePage = () => {

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
            <Typography sx={{ mb: '2vh' }}><strong>Category: </strong>{movie.category}</Typography>
                <Typography sx={{ mr: '1vw' }}><strong>Cast: </strong></Typography>
                {movie.cast !== undefined ? movie.cast.map((castMember) => {
                    return (
                        <Typography sx={{ mr: '2vw' }}>{castMember}</Typography>
                    )
                }) : ''}
            <Typography sx={{ mr: '1vw' }}><strong>Director: </strong>{movie.director}</Typography>
            <Typography sx={{ mr: '1vw' }}><strong>Producer: </strong>{movie.producer}</Typography>
            <Typography><strong>Summary: </strong>{movie.summary}</Typography>
            <Typography><strong>Reviews: </strong></Typography>
            {movie.reviews !== undefined ? movie.reviews.map((review) => {
                return (
                    <Typography>{review}</Typography>
                )
            }) : ''}
            <Typography><strong>Rating: </strong>{movie.rating}</Typography>
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
            <Typography><strong>Show Times: </strong></Typography>
            {movie.showDates !== undefined ? movie.showDates.map((showDate) => {
                return (
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Typography>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</Typography>
                        <Button>Book</Button>
                    </Box>
                )
            }) : ''}
        </Box>
    );
};

export default MoviePage;
