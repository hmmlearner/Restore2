import { useParams } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Divider, Grid, Typography, TableContainer, Table, TableRow, TableCell, TableBody, TextField } from "@mui/material";
import LoadingComponent from "../../App/layout/LoadingComponent";
import NotFoundError from "../../App/errors/NotFoundError";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./CatalogueSlice";

const ProductDetails = () => {
    //const { basket, setBasket, removeItem } = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const { basket, status } = useAppSelector(state => state.basket);
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const dispatch = useAppDispatch();
    const { status:productStatus } = useAppSelector(state => state.catalogue);
    
    //const [product, setProduct] = useState<Product>();
    //const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    const quantityChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.currentTarget.value) > 0)
            setQuantity(parseInt(event.currentTarget.value));
    }

    const updateQuantityHandler = () => {
        if (!product) return;
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId:item!.productId, quantity:updatedQuantity }))
        }
            else {
            const removeQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: item.productId, quantity: removeQuantity }))
            
            }
        
    }

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }
        //id && agent.Catalogue.details(parseInt(id))
        //    .then(response => { console.log(response); setProduct(response) })
        //    .catch((error) => console.log(error.response))
        //    .finally(() => setLoading(false))
        if (!product)
            dispatch(fetchProductAsync(parseInt(id!)))
    }, [id, item, product, dispatch]);

    if (productStatus.includes('pending')) {
        return <LoadingComponent message='Loading product...'/>
    }
    if (!product) {
        return <NotFoundError/>
    }
    return (
        <Grid container spacing={2} sx={{color: 'black'} }>
            <Grid item xs={6}>
                <img src={product?.pictureUrl} style={{ width: '100%' }}  alt={product?.name}></img>
          </Grid>
            <Grid item xs={6}>
                <Typography variant='h3' color='secondary'>{product?.name}</Typography>
                <Divider sx={{ mb: 2 }} />
              {/*  <Typography variant='h4'> ${(product!.price / 100).toFixed(2)}</Typography>*/}
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">{product?.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell align="right">{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell align="right">{product?.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={quantityChangeHandler }
                            variant="outlined"
                            fullWidth
                            type="number"
                            label="Quantity in the cart"
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={updateQuantityHandler }
                            sx={{ height: "55px" }}
                            color="primary"
                            size="large"
                            fullWidth
                            variant="contained"
                        >
                            {item ? "Update Quantity":"Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
          </Grid>
        </Grid>
    );

}
export default ProductDetails;