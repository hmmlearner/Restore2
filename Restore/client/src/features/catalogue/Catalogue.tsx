import { useEffect } from 'react';
import LoadingComponent from '../../App/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { fetchProductsAsync, productSelectors } from './CatalogueSlice';
import ProductList  from './ProductList';
const Catalogue = () => {

    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status } = useAppSelector(state => state.catalogue)

    useEffect(() => {
        if (!productsLoaded)
            dispatch(fetchProductsAsync());
    }, [productsLoaded]);

    if (status.includes('pending')) return <LoadingComponent message='Loading products...'></LoadingComponent>

    
    return (
        <>
            <ProductList products={products} />
            
        </>
    );
}
export default Catalogue;