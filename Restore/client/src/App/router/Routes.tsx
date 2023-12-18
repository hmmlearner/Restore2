import { createBrowserRouter, Navigate } from "react-router-dom";
import App from '../layout/App';
import Catalogue from '../../features/catalogue/Catalogue';
import ProductDetails from '../../features/catalogue/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import ContactPage from '../../features/contact/ContactPage';
import ServerError from "../errors/ServerError";
import NotFoundError from "../errors/NotFoundError";
import Basketpage from "../../features/basket/BasketPage";


//const Routes = () => {

export const router =  createBrowserRouter([{
        path: '/',
        element:<App/> ,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'catalogue', element: <Catalogue /> },
            { path: 'catalogue/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'basket', element: <Basketpage/>},
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFoundError /> }
            //{ path: '*', element: <Navigate replace to='/not-found' /> }

        ]

    }]);


//}
