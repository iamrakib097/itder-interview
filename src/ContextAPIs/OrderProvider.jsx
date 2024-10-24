import { createContext, useRef, useState } from "react";

export const OrderContext = createContext(null)
const OrderProvider = ({children}) => {
    const [examID, setExamID] = useState(null)
    const [open, setOpen] = useState(true)
    const sidebarRef = useRef(null);
    

    const info = {
        examID,
        setExamID,
        open,
        setOpen,
        sidebarRef
    }
    return (
        <OrderContext.Provider value={info} >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;