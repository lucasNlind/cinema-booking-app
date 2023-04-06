import { Box, Typography } from '@mui/material';

const ManageUsersSection = ({ userData, triggerGetData, setTriggerGetData, isLoading }) => {

    return (
        <Box sx={{ width: '40vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '2vw' }}>Manage Users</Typography>
        </Box>
    );
};

export default ManageUsersSection;
