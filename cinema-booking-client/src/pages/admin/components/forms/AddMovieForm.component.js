
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
        <Box sx={{ width: '60vw', height: '70vh', backgroundColor: 'white', m: 'auto', marginTop: '10vh', p: '2vw' , borderRadius: "5px" }}>
            <Typography sx={{fontSize:"30px" , marginBottom:"10px"}}>Add Movie</Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'inline-flex', alignItems:'center', marginBottom:'30px' }}>
                    <InputLabel sx={{ marginRight:'55px' }}>Title:</InputLabel>
                    <TextField sx={{ marginRight:'20px' }}
                        value={title}
                        onChange={titleChangeHandler}
                        type='text'
                        size='small'
                        name='title'
                        id='title'
                    ></TextField>
                    <InputLabel sx={{ marginRight:'22px' }}>Category:</InputLabel>
                    <TextField sx={{ width:'190px' }}
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
                        <MenuItem value='drama'>Drama</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ display: 'inline-flex', marginBottom:'30px', alignItems:'center' }}>
                    <InputLabel sx={{ marginRight:'52px' }}>Cast:</InputLabel>
                    <TextField sx={{ marginRight:'20px', width:'223px' }}
                        multiline={true}
                        rows={2}
                        value={cast}
                        onChange={castChangeHandler}
                        type='text'
                        size='small'
                        name='cast'
                        id='cast'
                    ></TextField>
                    <InputLabel sx={{ marginRight:'30px' }}>Director:</InputLabel>
                    <TextField
                        value={director}
                        onChange={directorChangeHandler}
                        type='text'
                        size='small'
                        name='director'
                        id='director'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex', marginBottom:'30px' }}>
                    <InputLabel sx={{ marginRight:'19px' }}>Producer:</InputLabel>
                    <TextField sx={{ marginRight:'20px' }}
                        value={producer}
                        onChange={producerChangeHandler}
                        type='text'
                        size='small'
                        name='producer'
                        id='producer'
                    ></TextField>
                    <InputLabel sx={{ marginRight:'18px' }}>Summary:</InputLabel>
                    <TextField sx={{ width:'400px' }}
                        multiline={true}
                        rows={5}
                        value={summary}
                        onChange={summaryChangeHandler}
                        type='text'
                        size='small'
                        name='summary'
                        id='summary'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex', marginBottom:'30px', alignItems:'center' }}>
                    <InputLabel sx={{ marginRight:'25px' }}>Reviews:</InputLabel>
                    <TextField sx={{ marginRight:'20px' }}
                        value={reviews}
                        onChange={reviewsChangeHandler}
                        type='text'
                        size='small'
                        name='reviews'
                        id='reviews'
                    ></TextField>
                    <InputLabel sx={{ marginRight:'14px' }}>Poster Url:</InputLabel>
                    <TextField sx={{ width:'300px' }}
                        value={moviePosterUrl}
                        onChange={moviePosterUrlChangeHandler}
                        type='text'
                        size='small'
                        name='moviePosterUrl'
                        id='moviePosterUrl'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex', marginBottom:'20px', alignItems:'center' }}>
                    <InputLabel sx={{ marginRight:'15px' }}>Trailer Url:</InputLabel>
                    <TextField sx={{ marginRight:'20px' }}
                        value={trailerUrl}
                        onChange={trailerUrlChangeHandler}
                        type='text'
                        size='small'
                        name='trailerUrl'
                        id='trailerUrl'
                    ></TextField>
                    <InputLabel sx={{ marginRight:'6px' }}>Showdates:</InputLabel>
                    <DateTimePicker
                        value={datePickerValue} 
                        onChange={(newValue) => setDatePickerValue(newValue)}
                        sx={{ width: '300px' }}
                    ></DateTimePicker>
                    <Button sx={{ marginLeft:'10px', marginRight:'10px', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained" onClick={addShowDate}>Add Show Date</Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {showDates.map((showDate) => {
                            return <Typography sx={{  }}>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</Typography>
                        })}
                    </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems:'center', marginBottom:'10px' }}>
                    <InputLabel sx={{ marginRight:'20px'}}>MPAA-US Rating:</InputLabel>
                    <TextField  sx={{ width:'80px' }}
                        value={rating}
                        onChange={ratingChangeHandler}
                        type='text'
                        size='small'
                        name='rating'
                        id='rating'
                    ></TextField>
                </Box>
                <Button sx={{ width: '10vw', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained" type='submit'>Add Movie</Button>
            </form>
        </Box>
    );
};

export default AddMovieForm;
