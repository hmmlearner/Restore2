import LoadingComponent from '../../App/layout/LoadingComponent';
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import  BasketSummary  from './BasketSummary';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './BasketSlice';


const Basketpage = () => {

    // const { basket, setBasket, removeItem } = useStoreContext();
    const dispatch = useAppDispatch();
    const { basket, status } = useAppSelector(state => state.basket);

    if (status.includes('pending')) return <LoadingComponent message="Loading...." />

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <> <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight:20 }} />
                                    <span>{item.name}</span>
                                </Box>

                                
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={status === ('pendingRemoveItem' + item.productId)}
                                    color="error"
                                    onClick={(e) => { e.preventDefault(); dispatch(removeBasketItemAsync({ productId: item.productId, quantity:1 })); }}>-</LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status === ('pendingAddItem'+ item.productId)}
                                    color="secondary"
                                    onClick={(e) => { e.preventDefault(); dispatch(addBasketItemAsync({ productId: item.productId, quantity:1 })); }}>+</LoadingButton>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100 * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton
                                    loading={status===('pendingRemoveItem' + item.productId)}
                                    color="error"
                                    onClick={(e) => { dispatch(removeBasketItemAsync({ productId: item.productId, quantity:item.quantity })); }}>
                                    <DeleteIcon  />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <Grid container spacing={2}>
            <Grid item xs={6} />
            <Grid item xs={6}>
                <BasketSummary/>
                </Grid>
            </Grid>
        </>);
}

export default Basketpage;