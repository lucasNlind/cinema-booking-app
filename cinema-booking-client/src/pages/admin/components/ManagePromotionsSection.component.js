import { Box, CircularProgress, Typography } from "@mui/material";

const ManagePromotionsSection = ({ promotionData, triggerGetData, setTriggerGetData, isLoading }) => {

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '40vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '2vw' }}>Manage Promotions</Typography>
        </Box>
    );
};

export default ManagePromotionsSection;