import { createContext, useState } from "react";

export const AlertContext = createContext()

import Alert from '../components/Alert'

export default function AlertContextProvider({children}) {
    const [alert, setAlert] = useState({
        show: false, 
        data: {
            title: "Game Rendered", 
            msg: "Everything is rendered correctly in this website", 
            theme: 'default', action: [
                {
                    content: "Reject",
                    theme: 'secondary',
                    click() {
                        console.log("Clicked")
                    }
                }, 
                {
                    content: "Accept", theme: "primary", click() {
                        
                    }
                }
            ]
        }
    })
    return (
        <AlertContext.Provider value={{alert, setAlert}}>
            {children}
            {
                alert.show ? <Alert /> : ''
            }
        </AlertContext.Provider>
    )
}