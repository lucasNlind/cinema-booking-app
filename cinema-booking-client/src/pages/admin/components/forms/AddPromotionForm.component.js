import axios from 'axios';

import { Box, Button, TextField, Typography, InputLabel } from "@mui/material";
import useInput from "../../../../hooks/input/use-input";

const AddPromotionForm = ({ triggerGetData, setTriggerGetData, setIsLoading, setShowAddPromotionModal }) => {

    const { text: promotionCode, inputChangeHandler: promotionCodeChangeHandler } = useInput();
    const { text: discountPercentage, inputChangeHandler: discountPercentageChangeHandler } = useInput();

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        if (!promotionCode.length || !discountPercentage.length) return;

        const newPromotion = {
            'promotionCode': promotionCode,
            'discountPercentage': discountPercentage
        }

        setIsLoading(true);
        try {
            await axios.post('http://localhost:3001/api/promotion', newPromotion);
            setIsLoading(false);
            setShowAddPromotionModal(false);
            setTriggerGetData(triggerGetData + 1);
            window.alert('You have successfully added a new promotion.');
        } catch (error) {
            setIsLoading(false);
        }
        
    };

    return (
        <Box sx={{ width: '40vw', height: '30vh', backgroundColor: 'white', m: 'auto', marginTop: '20vh', p: '2vw', borderRadius: "5px" }}>
            <Typography sx={{ fontSize:"30px" , marginBottom:"10px" }}>Add Promotion</Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'inline-flex', alignItems:'center' }}>
                    <InputLabel sx={{ marginRight:'40px' }}>Promotion Code:</InputLabel>
                    <TextField
                        value={promotionCode}
                        onChange={promotionCodeChangeHandler}
                        type='text'
                        size='small'
                        name='promotionCode'
                        id='promotionCode'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems:'center', marginTop:'20px' }}>
                    <InputLabel sx={{ marginRight:'6px' }}>Discount Percentage:</InputLabel>
                    <TextField
                        value={discountPercentage}
                        onChange={discountPercentageChangeHandler}
                        type='text'
                        size='small'
                        name='discountPercentage'
                        id='discountPercentage'
                    ></TextField>
                </Box>
                <Button sx={{ marginTop:'20px', width:'200px', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained"  type='submit'>Add Promotion</Button>
            </form>
        </Box>
    );
};

export default AddPromotionForm;
