import axios from 'axios';

import * as dayjs from 'dayjs';

import { useState } from 'react';
import { Box, Button, Modal, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AddMovieForm from './forms/AddMovieForm.component';
import EditMovieForm from './forms/EditMovieForm.component';

const ManageMoviesSection = ({ movieData, triggerGetData, setTriggerGetData, isLoading, setIsLoading }) => {

    const [activeMovie, setActiveMovie] = useState({});
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);

    const handleOpenAddMovieModal = () => setShowAddMovieModal(true);
    const handleCloseAddMovieModal = () => setShowAddMovieModal(false);

    const handleOpenEditMovieModal = (movie) => {
        setActiveMovie(movie);
        setShowEditMovieModal(true);
    }
    const handleCloseEditMovieModal = () =>setShowEditMovieModal(false);

    const handleDeleteMovie = async (movieId, title) => {

        const res = window.confirm('Are you sure you\'d like to delete this movie?');

        if (!res) return;

        setIsLoading(true);
        await axios.delete('http://localhost:3001/api/movie/delete/' + movieId);
        setIsLoading(false);
        setTriggerGetData(triggerGetData + 1);
        window.alert('You have successfully deleted movie with title: ' + title + '.');
    }

    return (
        <Box sx={{ width: '50vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Modal open={showAddMovieModal} onClose={handleCloseAddMovieModal}>
                <AddMovieForm
                    setIsLoading={setIsLoading}
                    triggerGetData={triggerGetData}
                    setTriggerGetData={setTriggerGetData}
                    setShowAddMovieModal={setShowAddMovieModal}
                />
            </Modal>
            <Modal open={showEditMovieModal} onClose={handleCloseEditMovieModal}>
                <EditMovieForm
                    activeMovie={activeMovie}
                    triggerGetData={triggerGetData}
                    setTriggerGetData={setTriggerGetData}
                    setShowEditMovieModal={setShowEditMovieModal}
                />
            </Modal>
            <Typography sx={{ fontSize: '2vw' }}>Movies</Typography>
            <TableContainer sx={{ mb: '4vh' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Director</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Producer</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Show Dates</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieData.map((movie) => {
                            return (
                                <TableRow key={movieData.indexOf(movie)}>
                                    <TableCell>{movie.title}</TableCell>
                                    <TableCell>{movie.director}</TableCell>
                                    <TableCell>{movie.producer}</TableCell>
                                    <TableCell >
                                        {movie.showDates.map((showDate) => {
                                            return <Typography sx={{ display: 'flex', flexDirection: 'column'}}>{dayjs(showDate).format('YYYY-MM-DD @ HH:mm')}</Typography>
                                        })}
                                    </TableCell>
                                    <TableCell>{movie.rating}</TableCell>
                                    <TableCell><Button onClick={() => handleOpenEditMovieModal(movie)}>Edit</Button></TableCell>
                                    <TableCell><Button onClick={() => handleDeleteMovie(movie._id, movie.title)}>Remove</Button></TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ marginLeft:'auto', marginRight:'auto'}}>
            <Button sx={{ display: 'flex', width: '10vw', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained" onClick={handleOpenAddMovieModal}>Add Movie</Button>
            </Box>
        </Box>
    );
};

export default ManageMoviesSection;
