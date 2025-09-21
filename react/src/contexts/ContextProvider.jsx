import { createContext, useContext, useState } from "react";

//cree un object context, a cause de la fonction createContext
const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    _setToken: () => { },
    _setNotification: () => { },
})

//component
const ContextProvider = ({ children }) => {
    //user: state, variable
    //setUser: setter du state, de la variable
    //{} la valeur par default
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, setNotification] = useState('');

    //fonction pour le contexte
    //une fonction flechee
    const _setToken = (token) => {
        //set le state
        setToken(token)
        //si token exist
        if (token) {
            //store
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            //remove
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    //fonction pour le contexte
    const _setNotification = message => {
        setNotification(message);
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }
    return (
        <div>
            {/*
        *** Appel du context
        *** user et token sont les property du context
        *** setUser : le setter du state user
        *** _setToken : fonction qui va set le state et
        *** store ou remove le token from local storage
        */}
            <StateContext value={{
                user,
                token,
                notification,
                setUser,
                _setToken,
                _setNotification
            }}>
                {children}
            </StateContext>
        </div>
    )
}
export default ContextProvider;

//useContext doit avoir un object context
//a utiliser dans le prochain component
export const useStateContext = () => useContext(StateContext);