import axios from 'axios';

import { useState } from "react";
import { Box, Modal, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import AddPromotionForm from "./forms/AddPromotionForm.component";

const ManagePromotionsSection = ({ promotionData, triggerGetData, setTriggerGetData, setIsLoading }) => {

    const [showAddPromotionModal, setShowAddPromotionModal] = useState(false);

    const handleOpenAddPromotionModal = () => setShowAddPromotionModal(true);
    const handleCloseAddPromotionModal = () => setShowAddPromotionModal(false);

    const handleSendPromotions = async () => {
        
        const res = window.confirm('Are you sure you\'d like to send the above promotions to all subscribed users?');

        if (!res) return;

        setIsLoading(true);

        try {
            await axios.post('http://localhost:3001/api/mail/promotion/', {});
            setIsLoading(false);
            window.alert('Successfully sent promotion emails.');
        } catch (error) {
            setIsLoading(false);
        }

    }

    const handleDeletePromotion = async (promotionId) => {

        const res = window.confirm('Are you sure you\'d like to delete this promotion?');

        if (!res) return;

        setIsLoading(true);

        try {
            await axios.delete('http://localhost:3001/api/promotion/delete/' + promotionId)
            setIsLoading(false);
            setTriggerGetData(triggerGetData + 1);
            window.alert('You have successfully the promotion.');
        } catch (error) {
            setIsLoading(false);
        }
        
    }

    return (
        <Box sx={{ width: '40vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Modal open={showAddPromotionModal} onClose={handleCloseAddPromotionModal}>
                <AddPromotionForm
                    triggerGetData={triggerGetData}
                    setTriggerGetData={setTriggerGetData}
                    setIsLoading={setIsLoading}
                    setShowAddPromotionModal={setShowAddPromotionModal}
                />
            </Modal>
            <Typography sx={{ fontSize: '2vw' }}>Promotions</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Promotion Code</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Discount Percentage</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promotionData.map((promotion) => {
                            return (
                                <TableRow key={promotion._id}>
                                    <TableCell>{promotion.promotionCode}</TableCell>
                                    <TableCell>{promotion.discountPercentage}%</TableCell>
                                    <TableCell><Button onClick={() => handleDeletePromotion(promotion._id)}>Remove</Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'20px', width:'200px', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained" onClick={handleOpenAddPromotionModal}>Add Promotion</Button>
            <Button sx={{ marginLeft:'auto', marginRight:'auto', marginTop:'20px', width:'300px', textAlign:'center', backgroundColor:'#496A81', '&:hover':{backgroundColor:'#5F7C90'} }} variant="contained" onClick={handleSendPromotions}>Send Promotions to All Users</Button>
        </Box>
    );
};

export default ManagePromotionsSection;
