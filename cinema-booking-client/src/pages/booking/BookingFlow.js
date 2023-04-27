import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, CircularProgress, Grid, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import * as dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';

import SEATS from './utils/seats';
import PaymentForm from './PaymentForm';
import { useAppSelector } from '../../hooks/redux/hooks';
import useInput from '../../hooks/input/use-input';
import { validatePromotionCodeLength } from '../../shared/utils/validation/length';

const BookingFlow = () => {

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [triggerGetData, setTriggerGetData] = useState(0);

    const [selectedPaymentCard, setSelectedPaymentCard] = useState(undefined);

    const [movie, setMovie] = useState({});
    const [showDate, setShowDate] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalNumTickets, setTotalNumTickets] = useState(0);
    const [isSelectingSeats, setIsSelectingSeats] = useState(false);
    const [numTicketsForChild, setNumTicketsForChild] = useState(0);
    const [numTicketsForAdult, setNumTicketsForAdult] = useState(0);
    const [isNumTicketsValid, setIsNumTicketsValid] = useState(false);
    const [numTicketsForSenior, setNumTicketsForSenior] = useState(0);
    const [isSelectingTickets, setIsSelectingTickets] = useState(true);
    const [totalAssignedTickets, setTotalAssignedTickets] = useState(0);    
    const [isSelectingPayment, setIsSelectingPayment] = useState(false);
    const [hasConfirmedOrder, setHasConfirmedOrder] = useState(false);

    const [isProvidingPaymentInfo, setIsProvidingPaymentInfo] = useState(false);
    const [isHomeAndBillingAddressEqual, setIsHomeAndBillingAddressEqual] = useState(false);

    const {
        text: promotionCode,
        shouldDisplayError: promotionCodeHasError,
        inputChangeHandler: promotionCodeChangeHandler,
        inputBlurHandler: promotionCodeBlurHandler,
        inputClearHandler: promotionCodeClearHandler
    } = useInput(validatePromotionCodeLength);

    const [searchParams] = useSearchParams();

    const { user } = useAppSelector((state) => state.auth);

    const handleSelectTickets = () => {
        setIsSelectingTickets(true);
        setIsSelectingSeats(false);
        setIsSelectingPayment(false);
    };

    const handleSelectSeats = () => {
        setIsSelectingTickets(false);
        setIsSelectingSeats(true);
        setIsSelectingPayment(false);
    };

    const handleSelectPayment = () => {
        setIsSelectingTickets(false);
        setIsSelectingSeats(false);
        setIsSelectingPayment(true);
    };

    const handleSelectSeat = (selectedSeat) => {

        if (selectedSeats.length == totalNumTickets && !(selectedSeats.includes(selectedSeat))) return;

        if (selectedSeats.includes(selectedSeat)) { // Removing seat
            const newSelectedSeats = selectedSeats.filter((seat) => {
                return seat != selectedSeat;
            });
            setSelectedSeats(newSelectedSeats);
            setTotalAssignedTickets(totalAssignedTickets + 1);
        } else { // Adding seat
            const newSelectedSeats = [...selectedSeats, selectedSeat];
            setSelectedSeats(newSelectedSeats);
            setTotalAssignedTickets(totalAssignedTickets - 1);
        }
    }

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleIsProvidingPaymentInfo = (e) => {
        setIsProvidingPaymentInfo(e.target.checked);
        setSelectedPaymentCard(undefined); // resetting payment card
    }

    const handleSelectPaymentCard = (paymentMethod) => {
        console.log('paymentMethod: ', paymentMethod);
        setSelectedPaymentCard(paymentMethod);
        setIsProvidingPaymentInfo(false);
    }

    const handleApplyDiscountCode = async () => {
        const formattedPromotionCode = promotionCode.replace('-', '');
        if (formattedPromotionCode.length !== 6) return;
        setIsLoading(true);
        const verifyPromotionCodeRequest = await axios.post('http://localhost:3001/api/promotion/verify/' + promotionCode);
        console.log(verifyPromotionCodeRequest.data);
        if (verifyPromotionCodeRequest.data !== 0) {
            window.alert('Successfully confirmed promotion code. Thank you!');
            const newTotalPrice = totalPrice - (totalPrice * (verifyPromotionCodeRequest.data / 100));
            setTotalPrice(newTotalPrice);
            promotionCodeClearHandler();
        } else {
            window.alert('You have provided an invalid promotion code.');
        }
        setIsLoading(false);
        return;
    }

    const handleConfirmOrder = async () => {
        const confirmOrderObject = {
            'email': userData.email,
            'movieTitle': movie.title,
            'totalPrice': totalPrice,
            'paymentInfo': selectedPaymentCard,
            'selectedSeats': selectedSeats
        };

        await axios.post('http://localhost:3001/api/mail/confirm-order/', confirmOrderObject);

        setIsSelectingTickets(false);
        setIsSelectingSeats(false);
        setIsSelectingPayment(false);
        setHasConfirmedOrder(true);
    }

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true);
            const movieId = searchParams.get('movieId');
            const paramSearchDate = searchParams.get('showDate');
            setShowDate(paramSearchDate);
            const fetchMovieInstance = await axios.get('http://localhost:3001/api/movie/fetch/' + movieId);
            setMovie(fetchMovieInstance.data);
            setIsLoading(false);
        }
        fetchMovie().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const fetchUserDataInstance = await axios.get('http://localhost:3001/api/user/fetch/' + user.id);
            setUserData(fetchUserDataInstance.data);
            setIsLoading(false);
        }
        fetchUserData().catch(console.error);
    }, [triggerGetData]);

    useEffect(() => {
        const totalTickets = numTicketsForChild + numTicketsForAdult + numTicketsForSenior;
        setTotalNumTickets(totalTickets);
        if (totalTickets > 0) setIsNumTicketsValid(true);
        else setIsNumTicketsValid(false);

        setTotalAssignedTickets(totalTickets);
        setTotalPrice((numTicketsForChild * 5) + (numTicketsForAdult * 12) + (numTicketsForSenior * 7));

    }, [numTicketsForChild, numTicketsForAdult, numTicketsForSenior]);

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '100vw', textAlign: 'center', display: 'flex', flexDirection: 'column', mb: '10vh' }}>
            {isSelectingTickets
            ?
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ m: 'auto', fontSize: '3vw', mt: '4vh', mb: '2vh' }}>Select your tickets</Typography>
                    <Typography sx={{ m: '2vh 0vw', fontSize: '2vw', textDecoration: 'underline' }}>Movie: {movie.title}</Typography>
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Typography sx={{ fontSize: '2vw', mr: '2vw' }}>Child: </Typography>
                        <IconButton onClick={() => numTicketsForChild >= 1 ? setNumTicketsForChild(numTicketsForChild - 1) : null}><RemoveIcon/></IconButton>
                        <Typography sx={{ fontSize: '2vw', ml: '2vw', mr: '2vw' }}>{numTicketsForChild}</Typography>
                        <IconButton onClick={() => setNumTicketsForChild(numTicketsForChild + 1)}><AddIcon/></IconButton>
                    </Box>
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Typography sx={{ fontSize: '2vw', mr: '2vw' }}>Adult: </Typography>
                        <IconButton onClick={() => numTicketsForAdult >= 1 ? setNumTicketsForAdult(numTicketsForAdult - 1) : null}><RemoveIcon/></IconButton>
                        <Typography sx={{ fontSize: '2vw', ml: '2vw', mr: '2vw' }}>{numTicketsForAdult}</Typography>
                        <IconButton onClick={() => setNumTicketsForAdult(numTicketsForAdult + 1)}><AddIcon/></IconButton>
                    </Box>
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Typography sx={{ fontSize: '2vw', mr: '2vw' }}>Senior: </Typography>
                        <IconButton onClick={() => numTicketsForSenior >= 1 ? setNumTicketsForSenior(numTicketsForSenior - 1) : null}><RemoveIcon/></IconButton>
                        <Typography sx={{ fontSize: '2vw', ml: '2vw', mr: '2vw' }}>{numTicketsForSenior}</Typography>
                        <IconButton onClick={() => setNumTicketsForSenior(numTicketsForSenior + 1)}><AddIcon/></IconButton>
                    </Box>
                    <Typography sx={{ fontSize: '2vw', mt: '4vh' }}>Total Tickets: {numTicketsForChild + numTicketsForAdult + numTicketsForSenior}</Typography>
                    <Button disabled={!isNumTicketsValid} onClick={handleSelectSeats} sx={{ width: '10vw', m: 'auto', mt: '4vh', backgroundColor: '#EABD23' }}>Continue</Button>
                </Box>
            : '' }
            {isSelectingSeats
            ?  
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ m: 'auto', fontSize: '3vw', mt: '4vh', mb: '2vh' }}>Select your seats</Typography>
                    <Typography sx={{ fontSize: '2vw', mb: '2vh' }}>Tickets left to assign: {totalAssignedTickets}</Typography>
                    <Grid container spacing={1} sx={{ m: 'auto', width: '30vw' }}>
                        {
                            SEATS.map((seat) => {
                                return (
                                    <Grid key={SEATS.indexOf(seat)} item xs={1}>
                                        <Box
                                            sx={{
                                                width: '2vw',
                                                height: '2vw',
                                                display: 'flex',
                                                backgroundColor: selectedSeats.includes(seat) ? 'black' : 'white',
                                                color: selectedSeats.includes(seat) ? 'white' : 'black',
                                                border: '1px solid black',
                                                borderRadius: '15px',
                                                ':hover': {
                                                    backgroundColor: selectedSeats.includes(seat) ? 'white' : 'black',
                                                    color: selectedSeats.includes(seat) ? 'black' : 'white',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                            onClick={() => handleSelectSeat(seat)}
                                        >
                                            <Typography sx={{ m: 'auto' }}>{seat}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Button sx={{ width: '10vw', m: 'auto', mt: '4vh', backgroundColor: '#EABD23', mr: '1vw' }} onClick={handleSelectTickets}>Go Back</Button>
                        <Button disabled={totalAssignedTickets !== 0} sx={{ width: '10vw', m: 'auto', mt: '4vh', backgroundColor: '#EABD23', ml: '1vw' }} onClick={handleSelectPayment}>Continue</Button>
                    </Box>
                </Box>
            : '' }
            {isSelectingPayment
            ?
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ m: 'auto', fontSize: '3vw', mt: '4vh', mb: '2vh' }}>Select your payment</Typography>
                    <Typography sx={{ fontSize: '2vw', mb: '2vh' }}>Order Summary</Typography>
                    <Typography sx={{ fontSize: '1vw', mr: '2vw' }}># Child: {numTicketsForChild} x $5.00 = {currencyFormatter.format(numTicketsForChild * 5)}</Typography>
                    <Typography sx={{ fontSize: '1vw', mr: '2vw' }}># Adult: {numTicketsForAdult} x $12.00 = {currencyFormatter.format(numTicketsForAdult * 12)}</Typography>
                    <Typography sx={{ fontSize: '1vw', mr: '2vw' }}># Senior: {numTicketsForSenior} x $7.00 = {currencyFormatter.format(numTicketsForSenior * 7)}</Typography>
                    <Typography sx={{ fontSize: '1vw', mt: '2vh'     }}><strong>Total: </strong>{currencyFormatter.format(totalPrice)}</Typography>

                    <Box sx={{ display: 'inline-flex', m: 'auto', mt: '2vh' }}>
                        <TextField
                            sx={{ width: '10vw', height: '5vh' }}
                            value={promotionCode}
                            onChange={promotionCodeChangeHandler}
                            error={promotionCodeHasError}
                            id='promotionCode'
                            name='promotionCode'
                            label='Promotion Code'
                        ></TextField>
                        <Button onClick={handleApplyDiscountCode} sx={{ border: '1px solid black', color: 'black' }}>Apply Promotion Code</Button>
                    </Box>
                    {userData.paymentInfo.length > 0
                    ?
                        userData.paymentInfo.map((paymentInfo) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: '4vh' }}>
                                    <Typography sx={{ fontSize: '2.2vw' }}>Stored payments:</Typography>
                                    <Box sx={{ display: 'inline-flex', m: 'auto', height: '5vh' }}>
                                        <Typography sx={{ lineHeight: '5vh' }}>XXXX-XXXX-XXX-{paymentInfo.cardNumber.slice(-4)}</Typography>
                                        <Button onClick={() => handleSelectPaymentCard(paymentInfo)}>Use this payment card</Button>
                                        {selectedPaymentCard !== undefined && selectedPaymentCard.paymentId === paymentInfo.paymentId ? <CheckIcon></CheckIcon> : ''}
                                    </Box>
                                    <FormGroup sx={{ m: 'auto' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isProvidingPaymentInfo}
                                                    onChange={handleIsProvidingPaymentInfo}
                                                />
                                            }
                                            label="I would like to provide a new payment card"
                                            disabled={userData.homeAddress === null}
                                        />
                                    </FormGroup>
                                </Box>
                            )
                        })
                    : ''}
                    <PaymentForm
                        userData={userData}
                        setSelectedPaymentCard={setSelectedPaymentCard}
                        isProvidingPaymentInfo={isProvidingPaymentInfo}
                        setIsProvidingPaymentInfo={setIsProvidingPaymentInfo}
                        isHomeAndBillingAddressEqual={isHomeAndBillingAddressEqual}
                        setIsHomeAndBillingAddressEqual={setIsHomeAndBillingAddressEqual}
                    />
                    <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                        <Button sx={{ width: '10vw', m: 'auto', mt: '4vh', backgroundColor: '#EABD23', mr: '1vw' }} onClick={handleSelectSeats}>Go Back</Button>
                        <Button
                            onClick={handleConfirmOrder}
                            disabled={selectedPaymentCard === undefined}
                            sx={{ width: '15vw', m: 'auto', mt: '4vh', backgroundColor: '#EABD23', ml: '1vw' }}
                        >Confirm Purchase</Button>
                    </Box>
                </Box>
            : '' }
            {hasConfirmedOrder
            ?
                <Box sx={{ width: '100%', m: 'auto' }}>
                    <Typography sx={{ width: '35vw', fontSize: '2vw', m: 'auto', mt: '25vh' }}>You have successfully placed your order! An email confirmation has been sent to your email.</Typography>
                    <Button onClick={goToHome} sx={{ mt: '4vh' }}>Home</Button>
                </Box>
            : ''}
        </Box>
    );
};

export default BookingFlow;
