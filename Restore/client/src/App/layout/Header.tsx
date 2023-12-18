import { AppBar, Toolbar, Typography, Switch, List, ListItem, IconButton, Badge, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
import { useAppSelector } from '../../store/configureStore';

interface Props {
    darkMode: boolean,
    handleChange: () => void;
}
const navStyles = {
    color: 'inherit',
    Typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const midlinks = [
     { title: 'Catalogue', path: '/catalogue' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
]
const leftLinks = [
    {title:'Login', path:'/login'},
    {title:'Register', path:'/register'}
]

const Header = ({ darkMode, handleChange }: Props) => {
    const { basket } = useAppSelector(state => state.basket);//useStoreContext();
    const cartCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (<AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems:'center' }}>
            <Typography variant="h6" component={NavLink} to="/"
                sx={navStyles}>
                Re-store
            </Typography>
                <Switch onChange={handleChange} checked={darkMode} color='default' />
            </Box>
            <List sx={{ display: 'flex' }}>
                {midlinks.map((link, index) =>
                    <ListItem key={index} sx={navStyles}>
                        <NavLink to={link.path}> {link.title.toUpperCase()}</NavLink>
                    </ListItem>)}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton component={Link} to='/basket' size='large' sx={{ mr: 2 }} color='inherit'>
                    <Badge badgeContent={cartCount} color='secondary'>
                        <ShoppingCartIcon color='primary' />
                </Badge>
            </IconButton>

            <List sx={{ display: 'flex' }}>
                {leftLinks.map((link, index) =>
                    <ListItem key={index} sx={navStyles}>
                        <NavLink to={link.path}> {link.title.toUpperCase()}</NavLink>
                    </ListItem>)}
                </List>
            </Box>
        </Toolbar>

    </AppBar>);
}

export default Header;