import axios from 'axios';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ManageMoviesSection from './components/ManageMoviesSection.component';
import ManageUsersSection from './components/ManageUsersSection.component';
import ManagePromotionsSection from './components/ManagePromotionsSection.component';

const AdminConsole = () => {

    const [userData, setUserData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [promotionData, setPromotionData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('movies');
    const [triggerGetData, setTriggerGetData] = useState(0);

    useEffect(() => {
        const fetchMovieData = async () => {
            setIsLoading(true);
            const fetchMovieDataInstance = await axios.get('http://localhost:3001/api/movie/fetch-all');
            setMovieData(fetchMovieDataInstance.data);
            setIsLoading(false);
        };

        const fetchUserData = async () => {
            setIsLoading(true);
            const fetchUserDataInstance = await axios.get('http://localhost:3001/api/user/fetch-all');
            setUserData(fetchUserDataInstance.data);
            setIsLoading(false);
        };

        const fetchPromotionData = async () => {
            setIsLoading(true);
            const fetchPromotionDataInstance = await axios.get('http://localhost:3001/api/promotion/fetch-all');
            setPromotionData(fetchPromotionDataInstance.data);
            setIsLoading(false);
        }

        fetchMovieData().catch(console.error);
        fetchUserData().catch(console.error);
        fetchPromotionData().catch(console.error);
    }, [triggerGetData]);

    return (
        <Box
            sx={{
                display: 'inline-flex',
                color: 'black',
                width: '100%',
                m: 'auto',
                mt: '10vh',
                mb: '10vh',
            }}
        >
            <Box sx={{ width: '20vw', height: '60vh', display: 'flex', flexDirection: 'column', m: 'auto', ml: '10vw' }}>
                <Typography sx={{ fontSize: '2vw', color: 'black', textAlign: 'left', mt: '3vh' }}>Admin Console</Typography>
                <Box sx={{ backgroundColor: 'black', width: '20vw', height: '2px' }}></Box>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('movies')}
                >Manage Movies</Typography>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('users')}
                >Manage Users</Typography>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('promotions')}
                >Manage Promotions</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: '70vw', mt: '15vh', ml: '5vw' }}>
                {activeTab === 'movies' ?
                    <ManageMoviesSection
                        movieData={movieData}
                        setMovieData={setMovieData}
                        triggerGetData={triggerGetData}
                        setTriggerGetData={setTriggerGetData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    /> : ''}
                {activeTab === 'users' ?
                    <ManageUsersSection
                        userData={userData}
                        triggerGetData={triggerGetData}
                        setTriggerGetData={setTriggerGetData}
                        isLoading={isLoading}
                    /> : ''}
                {activeTab === 'promotions' ?
                    <ManagePromotionsSection
                        promotionData={promotionData}
                        triggerGetData={triggerGetData}
                        setTriggerGetData={setTriggerGetData}
                        isLoading={isLoading}
                    /> : ''}
            </Box>
        </Box>
    );
};

export default AdminConsole;
