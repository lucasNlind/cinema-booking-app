import axios from 'axios';
import useInput from '../../../hooks/input/use-input';

import * as dayjs from 'dayjs'

import { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AddMovieForm from './forms/AddMovieForm.component';

const ManageMoviesSection = ({ movieData, setMovieData, triggerGetData, setTriggerGetData, isLoading, setIsLoading }) => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '50vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Modal open={showModal} onClose={handleCloseModal} sx={{ backgroundColor: 'white' }}>
                <AddMovieForm
                    setIsLoading={setIsLoading}
                    triggerGetData={triggerGetData}
                    setTriggerGetData={setTriggerGetData}
                    setShowModal={setShowModal}
                />
            </Modal>
            <Typography sx={{ fontSize: '2vw' }}>Movies</Typography>
            <TableContainer sx={{ mb: '4vh' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Producer</TableCell>
                            <TableCell>Show Dates</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieData.map((movie) => {
                            return (
                                <TableRow key={movieData.indexOf(movie)}>
                                    <TableCell>{movie.title}</TableCell>
                                    <TableCell>{movie.director}</TableCell>
                                    <TableCell>{movie.producer}</TableCell>
                                    <TableCell>{dayjs.unix(movie.showDates[0]).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{movie.rating}</TableCell>
                                    <TableCell><Button>Edit</Button></TableCell>
                                    <TableCell><Button>Remove</Button></TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleOpenModal}>Add Movie</Button>
        </Box>
    );
};

export default ManageMoviesSection;
