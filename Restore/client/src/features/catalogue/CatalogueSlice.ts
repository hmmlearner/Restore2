import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../App/api/agent";
import { Product } from "../../App/models/product";
import { RootState } from "../../store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalogue/fetchProductsAsync',
    async () => {
        try {
            return await agent.Catalogue.list();
        }
        catch (error) {
            console.log(error);
        }
    }
);

export const fetchProductAsync = createAsyncThunk<Product,number>(
    'catalogue/fetchProductAsync',
    async (productId: number) => {
        try {
            return await agent.Catalogue.details(productId);
        }
        catch (error) {
            console.log(error);
        }
    }
);


export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builders)=> {
        builders.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts' 
        })
        builders.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle'
        })
        builders.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle'
        })

        builders.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        })
        builders.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        })
        builders.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle'
        })
    }
})

export const productSelectors = productsAdapter.getSelectors<RootState>(state => state.catalogue);