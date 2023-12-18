import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../App/api/agent";
import { Basket } from "../../App/models/basket";

interface BasketState {
    basket: Basket | null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity: number }>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1 }) => {
        try {
           return await agent.Basket.addItem(productId, quantity);
        }
        catch(error) {
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk <void, {productId:number, quantity?:number}> (
    'basket/removeBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            console.log('Before setBasket ');
            state.basket = action.payload;
            console.log('after setBasket ');
        },
       
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem'+action.meta.arg.productId;
            console.log(action);
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.error);
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
            console.log(action);
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state,action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(item => item.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            console.log('Before removing item ' + state.basket!.items[itemIndex].quantity);
            state.basket!.items[itemIndex].quantity -= quantity!;
            console.log('after removing item ' + state.basket!.items[itemIndex].quantity);
            if (state.basket!.items[itemIndex].quantity === 0)
                state.basket?.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        })
    }
})

export const { setBasket } = BasketSlice.actions;

