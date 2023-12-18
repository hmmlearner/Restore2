import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

const NotFoundError = () => {
    return (
        <Container component={Paper} sx={{height:20} }>
            <Typography variant="h5" gutterBottom>Oops! we couldn't find what you are looking for</Typography>
            <Divider />
            <Button fullWidth component={Link} to={'/catalogue' }>Go back to shop</Button>
        </Container>
    );

}

export default NotFoundError;