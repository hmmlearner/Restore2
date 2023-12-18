import { Children, createContext, useContext, useState } from 'react'
import { Basket } from '../models/basket'

interface StoreContextValue {
    basket: Basket | null,
    setBasket: (basket: Basket) => (void),
    removeItem: (productId: number, quantity: number) => (void)
}



export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    if (context === undefined) throw Error('oops context is not defined');
    return context;
}

const StoreProvider = ({ children }: any) => {
    const [basket, setBasket] = useState<Basket|null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if (basket == null) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(item => item.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) {
                items.splice(itemIndex, 1);
            }
            setBasket(prevState => {
                return { ...prevState!, items }
            });
        }

    }
    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )

}
export default StoreProvider;

