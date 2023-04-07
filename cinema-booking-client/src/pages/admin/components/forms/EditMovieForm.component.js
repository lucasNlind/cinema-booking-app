import axios from 'axios';

import * as dayjs from 'dayjs';

import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, CircularProgress, InputLabel } from "@mui/material";


const EditMovieForm = ({ activeMovie, triggerGetData, setTriggerGetData, setShowEditMovieModal }) => {

    const [isLoadingUpdateMovie, setIsLoadingUpdateMovie] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState(dayjs('2023-04-17T15:30'));

    const handleDeleteShowTime = async (removedShowDate) => {

        const res = window.confirm('Are you sure you\'d like to delete this show time?')

        if (!res) return;

        const newShowDates = activeMovie.showDates.filter((showDate) => {
            return showDate !== removedShowDate;
        });

        const updatedMovieObject = {
            'showDates': newShowDates
        }

        setIsLoadingUpdateMovie(true);
        await axios.patch('http://localhost:3001/api/movie/update/show-dates/remove/' + activeMovie._id, updatedMovieObject);
        setIsLoadingUpdateMovie(false);
        setTriggerGetData(triggerGetData + 1);
        setShowEditMovieModal(false);
        window.alert('Successfully removed show time.');
    }

    const handleAddShowTime = async () => {

        const newDateInMillis = datePickerValue.valueOf();
        if (activeMovie.showDates.includes(newDateInMillis)) return;
        const updatedMovieObject = {
            'newShowDate': newDateInMillis
        };

        setIsLoadingUpdateMovie(true);

        try {
            await axios.patch('http://localhost:3001/api/movie/update/show-dates/add/' + activeMovie._id, updatedMovieObject);
            setIsLoadingUpdateMovie(false);
            setTriggerGetData(triggerGetData + 1);
            setShowEditMovieModal(false);
            window.alert('Successfully added new show time.');
        } catch (error) {
            console.log('res: ', error.response)
            if (error.response.data.statusCode === 400) {
                window.alert('It looks like there is already a movie at that showtime. Please try again.');
                setIsLoadingUpdateMovie(false);
            }
        }
    }

    if (isLoadingUpdateMovie) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '60vw', height: '65vh', backgroundColor: 'white', m: 'auto', marginTop: '10vh', p: '2vw', borderRadius: "5px"  }}>
            <Typography sx={{ fontSize:"30px"}}>Movie Showtimes</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Show Time</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeMovie.showDates.map((showDate) => {
                            return (
                                <TableRow>
                                    <TableCell>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</TableCell>
                                    <TableCell><Button onClick={() => handleDeleteShowTime(showDate)}>Remove</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography sx={{ mt: '4vh', fontSize:'20px', marginBottom:'10px' }}>Add Show Time</Typography>
            <InputLabel>Show Date:</InputLabel>
                <DateTimePicker
                    value={datePickerValue} 
                    onChange={(newValue) => setDatePickerValue(newValue)}
                    sx={{ width: '15vw' }}
                ></DateTimePicker>
                <Button onClick={handleAddShowTime}>Add Time</Button>
        </Box>
    );
};

export default EditMovieForm;
