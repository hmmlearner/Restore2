import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BasketSlice } from "../features/basket/BasketSlice";
import { catalogueSlice } from "../features/catalogue/CatalogueSlice";
import { CounterSlice } from "../features/contact/CounterSlice";

export const store = configureStore({
    reducer: {
        counter: CounterSlice.reducer,
        basket: BasketSlice.reducer,
        catalogue: catalogueSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;