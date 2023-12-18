import {Container,Divider,Paper,Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';

const ServerError = () => {
    const { state } = useLocation();
    return (
        <Container component={Paper}>
            {state.error ? (
                <>
                    <Typography variant="h3" gutterBottom>{state.error.Title}</Typography>
                    <Divider></Divider>
                    <Typography variant="body1" gutterBottom>{state.error.detail || "Internal Error"}</Typography>
                </>
            ): (<><Typography variant="h5" gutterBottom>Server Error</Typography> </>)}
            
        </Container>
    );
}

export default ServerError;