import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { incrementCounter, decrementCounter } from "../contact/CounterSlice";


const ContactPage = () => {

    const dispatch = useAppDispatch();//useDispatch();
    const { data, title } = useAppSelector(state => state.counter)
    return (
        <>
            <Typography variant='h2'>
                {title}
            </Typography>
            <Typography variant='h5'>
                {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrementCounter(1))} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => dispatch(incrementCounter(1))} variant='contained' color='primary'>Increment</Button>
                <Button onClick={() => dispatch(incrementCounter(5))} variant='contained' color='secondary'>Increment by 5</Button>
            </ButtonGroup>
        </>
    );

}
export default ContactPage;