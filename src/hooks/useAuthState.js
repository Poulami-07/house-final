import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const useAuthState = () => {
    const [loggedIN, setLoggedIn] = useState(false)
    const [checkState, setcheckState] = useState(true)

    useEffect(() =>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true)
            }
            setcheckState(false)
        });
    }) ;

  return { loggedIN, checkState};
};

export default useAuthState;