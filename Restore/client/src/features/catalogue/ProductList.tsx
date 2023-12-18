import { Grid } from '@mui/material';
//import ListItem from '@mui/material/ListItem';
//import ListItemAvatar from '@mui/material/ListItemAvatar';
//import ListItemText from '@mui/material/ListItemText';
//import Avatar from '@mui/material/Avatar';
import ProductCard from './ProductCard';
import { Product } from '../../App/models/product';

interface Props {
    products: Product[]
}

const ProductList = ({ products }: Props) => {
    return (
        <>
            <Grid container spacing={2}>
                {/*{products.map((product) => (<ListItem key={product.id}>*/}
                {/*    <ListItemAvatar> <Avatar alt={product.name} src={product.pictureUrl} /></ListItemAvatar>*/}
                {/*    <ListItemText>*/}
                {/*        {product.name} - $ {(product.price / 100).toFixed(2)}*/}
                {/*    </ListItemText>*/}
                {/*</ListItem>))}*/}
                {products.map((product) => (<Grid item xs={4} key={product.id}><ProductCard  product={product} /></Grid>))}
            </Grid>

        </>
    );
}
export default ProductList;