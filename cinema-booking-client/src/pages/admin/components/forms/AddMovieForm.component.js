
import axios from 'axios';
import useInput from '../../../../hooks/input/use-input';

import * as dayjs from 'dayjs';

import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Box, Button, InputLabel, TextField, Typography, MenuItem } from '@mui/material';

const AddMovieForm = ({ triggerGetData, setTriggerGetData, setIsLoading, setShowAddMovieModal }) => {

    const { text: title, inputChangeHandler: titleChangeHandler } = useInput();
    const { text: cast, inputChangeHandler: castChangeHandler } = useInput();
    const { text: category, inputChangeHandler: categoryChangeHandler } = useInput();
    const { text: director, inputChangeHandler: directorChangeHandler } = useInput();
    const { text: producer, inputChangeHandler: producerChangeHandler } = useInput();
    const { text: summary, inputChangeHandler: summaryChangeHandler } = useInput();
    const { text: reviews, inputChangeHandler: reviewsChangeHandler } = useInput();
    const { text: moviePosterUrl, inputChangeHandler: moviePosterUrlChangeHandler } = useInput();
    const { text: trailerUrl, inputChangeHandler: trailerUrlChangeHandler } = useInput();
    const { text: rating, inputChangeHandler: ratingChangeHandler } = useInput();

    const [showDates, setShowDates] = useState([]);
    const [datePickerValue, setDatePickerValue] = useState(dayjs('2023-04-17T15:30'));

    const addShowDate = () => {
        const newDateInMillis = datePickerValue.valueOf();
        if (showDates.includes(newDateInMillis)) return;
        const newShowDates = [...showDates, newDateInMillis];
        setShowDates(newShowDates);
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        if (
            !title.length ||
            !category.length ||
            !cast.length ||
            !director.length ||
            !producer.length ||
            !summary.length ||
            !reviews.length ||
            !moviePosterUrl.length ||
            !trailerUrl.length ||
            !rating.length ||
            !showDates.length
        ) return;

        const castMembers = cast.split(',');
        const reviewsList = reviews.split(';');

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
            'showDates': showDates,
            'rating': rating
        };

        setIsLoading(true);

        try {
            await axios.post('http://localhost:3001/api/movie/', newMovie);
            setIsLoading(false);
            setShowAddMovieModal(false);
            setTriggerGetData(triggerGetData + 1);
            window.alert('You have successfully added a new movie.');
        } catch (error) {
            if (error.response.data.statusCode === 400) {
                window.alert('It looks like there is already a movie at that showtime. Please try again.');
                setIsLoading(false);
            }
        }
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
                        <MenuItem value='romantic-comedy'>Romantic Comedy</MenuItem>
                        <MenuItem value='drama'>Drama</MenuItem>
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
                    <DateTimePicker
                        value={datePickerValue} 
                        onChange={(newValue) => setDatePickerValue(newValue)}
                        sx={{ width: '15vw' }}
                    ></DateTimePicker>
                    <Button onClick={addShowDate}>Add Show Date</Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {showDates.map((showDate) => {
                            return <Typography>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</Typography>
                        })}
                    </Box>
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
                <Button sx={{ width: '10vw' }} type='submit'>Add Movie</Button>
            </form>
        </Box>
    );
};

export default AddMovieForm;
