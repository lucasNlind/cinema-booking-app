
import axios from 'axios';
import useInput from '../../../../hooks/input/use-input';

import { Box, Button, InputLabel, TextField, Typography, MenuItem } from '@mui/material';

const AddMovieForm = ({ triggerGetData, setTriggerGetData, setIsLoading, setShowModal }) => {

    const { text: title, inputClearHandler: titleClearHandler, inputChangeHandler: titleChangeHandler } = useInput();
    const { text: cast, inputClearHandler: castClearHandler, inputChangeHandler: castChangeHandler } = useInput();
    const { text: category, inputClearHandler: categoryClearHandler, inputChangeHandler: categoryChangeHandler } = useInput();
    const { text: director, inputClearHandler: directorClearHandler, inputChangeHandler: directorChangeHandler } = useInput();
    const { text: producer, inputClearHandler: producerClearHandler, inputChangeHandler: producerChangeHandler } = useInput();
    const { text: summary, inputClearHandler: summaryClearHandler, inputChangeHandler: summaryChangeHandler } = useInput();
    const { text: reviews, inputClearHandler: reviewsClearHandler, inputChangeHandler: reviewsChangeHandler } = useInput();
    const { text: moviePosterUrl, inputClearHandler: moviePosterUrlClearHandler, inputChangeHandler: moviePosterUrlChangeHandler } = useInput();
    const { text: trailerUrl, inputClearHandler: trailerUrlClearHandler, inputChangeHandler: trailerUrlChangeHandler } = useInput();
    const { text: showDates, inputClearHandler: showDatesClearHandler, inputChangeHandler: showDatesChangeHandler } = useInput();
    const { text: rating, inputClearHandler: ratingClearHandler, inputChangeHandler: ratingChangeHandler } = useInput();

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        const castMembers = cast.split(',');
        const reviewsList = reviews.split(';');
        const showDatesList = showDates.split(',')

        const newMovie = {
            'title': title,
            'category': category,
            'cast': castMembers,
            'director': director,
            'producer': producer,
            'summary': summary,
            'reviews': reviewsList,
            'moviePosterUrl': moviePosterUrl,
            'trailerUrl': trailerUrl,
            'showDates': showDatesList,
            'rating': rating
        };

        console.log('newMovie: ', newMovie);

        setIsLoading(true);
        await axios.post('http://localhost:3001/api/movie/', newMovie);
        setIsLoading(false);
        setShowModal(false);
        setTriggerGetData(triggerGetData + 1);
        window.alert('You have successfully added a new movie.')
    }

    return (
        <Box sx={{ width: '60vw', height: '40vh', backgroundColor: 'white', m: 'auto', marginTop: '20vh', p: '2vw' }}>
            <Typography>Add Movie</Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>Title:</InputLabel>
                    <TextField
                        value={title}
                        onChange={titleChangeHandler}
                        type='text'
                        size='small'
                        name='title'
                        id='title'
                    ></TextField>
                    <InputLabel>Category:</InputLabel>
                    <TextField
                        value={category}
                        onChange={categoryChangeHandler}
                        type='text'
                        size='small'
                        name='category'
                        id='category'
                        select
                    >
                        <MenuItem value='action'>Action</MenuItem>
                        <MenuItem value='sci-fi'>Sci-Fi</MenuItem>
                        <MenuItem value='comedy'>Comedy</MenuItem>
                        <MenuItem value='comantic-comedy'>Romantic Comedy</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>Cast:</InputLabel>
                    <TextField
                        value={cast}
                        onChange={castChangeHandler}
                        type='text'
                        size='small'
                        name='cast'
                        id='cast'
                    ></TextField>
                    <InputLabel>Director:</InputLabel>
                    <TextField
                        value={director}
                        onChange={directorChangeHandler}
                        type='text'
                        size='small'
                        name='director'
                        id='director'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>Producer:</InputLabel>
                    <TextField
                        value={producer}
                        onChange={producerChangeHandler}
                        type='text'
                        size='small'
                        name='producer'
                        id='producer'
                    ></TextField>
                    <InputLabel>Summary:</InputLabel>
                    <TextField
                        value={summary}
                        onChange={summaryChangeHandler}
                        type='text'
                        size='small'
                        name='summary'
                        id='summary'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>Reviews:</InputLabel>
                    <TextField
                        value={reviews}
                        onChange={reviewsChangeHandler}
                        type='text'
                        size='small'
                        name='reviews'
                        id='reviews'
                    ></TextField>
                    <InputLabel>Movie Poster Url:</InputLabel>
                    <TextField
                        value={moviePosterUrl}
                        onChange={moviePosterUrlChangeHandler}
                        type='text'
                        size='small'
                        name='moviePosterUrl'
                        id='moviePosterUrl'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>Trailer Url:</InputLabel>
                    <TextField
                        value={trailerUrl}
                        onChange={trailerUrlChangeHandler}
                        type='text'
                        size='small'
                        name='trailerUrl'
                        id='trailerUrl'
                    ></TextField>
                    <InputLabel>Showdates:</InputLabel>
                    <TextField
                        value={showDates}
                        onChange={showDatesChangeHandler}
                        type='text'
                        size='small'
                        name='showDates'
                        id='showDates'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                    <InputLabel>ESRB Rating:</InputLabel>
                    <TextField
                        value={rating}
                        onChange={ratingChangeHandler}
                        type='text'
                        size='small'
                        name='rating'
                        id='rating'
                    ></TextField>
                </Box>
                <Button type='submit'>Add Movie</Button>
            </form>
        </Box>
    );
};

export default AddMovieForm;
