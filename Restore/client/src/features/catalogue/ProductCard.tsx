import { Product } from '../../App/models/product';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { addBasketItemAsync } from '../basket/BasketSlice';
interface Props {
    product : Product
}


const ProductCard = ({ product }: Props) => {
    //const [loading, setLoading] = useState(false);
    // const { setBasket } = useStoreContext();
    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();

    /*
    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId, 1)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false));
    } */

    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red', backgroundColor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{ sx: { fontWeight: 'bold', color:'secondary.main' } }}
            />
            <CardMedia sx={{ height: 140, backgroundSize: 'contain', backgroundColor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography variant="h5" color="secondary">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <LoadingButton loading={status.includes('pendingAddItem'+product.id)}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }))}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
);
}
export default ProductCard;

//function useState(arg0: boolean): any {
//    throw new Error('Function not implemented.');
//}
