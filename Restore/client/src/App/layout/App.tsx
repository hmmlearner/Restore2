import { Typography, Container, CssBaseline, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Header  from './Header';
import Catalogue from '../../features/catalogue/Catalogue';
import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import { getCookie } from '../utils/utils';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { setBasket } from '../../features/basket/BasketSlice';

function App() {
    // const { setBasket } = useStoreContext();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [currentMode, setCurrentMode] = useState(false);
    const pallate = currentMode ? 'light' : 'dark';
    const theme = createTheme({
        palette: {
            mode: pallate,
            background: {
                default: '#eaeaea'
            }
        }
    });

    useEffect(() => {
        const buyerid = getCookie('buyerId');
        if (buyerid) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log("error in retrieving the basket "))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch]);

    const pallateSwitchHandler = () => {
        setCurrentMode(!currentMode);
    }

    if (loading) <LoadingComponent message="Initialing app..."/>

  return (
      <>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header darkMode={currentMode} handleChange={pallateSwitchHandler} />
              <Container>
                  <Outlet />
              </Container>
          </ThemeProvider>
      </>
  );
}

export default App;
