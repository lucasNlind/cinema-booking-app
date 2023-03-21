import { Box, Typography } from '@mui/material';

const ConfirmEmail = () => {
    return (
        <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', border: '1px solid black', marginBottom: '10vh' }}>
            <Typography sx={{ fontSize: '3vw', color: 'black', textAlign: 'center', mt: '3vh' }}>Confirm Email</Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mt: '3vh' }}>
                An email with a confirmation code has been sent to your email.
            </Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center' }}>
                Please enter it below to activate your account.
            </Typography>
            <form></form>
        </Box>
    );
}

export default ConfirmEmail;
