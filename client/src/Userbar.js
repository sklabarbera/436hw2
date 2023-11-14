import { useContext } from "react";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./contexts";

export default function Userbar() {
    const { state, dispatch: dispatchUser } = useContext(StateContext); //dispatch from StateContext is being renamed to disaptchUser
    const { user } = state;
    
    if (user) { 
        return <Logout /> 
    } else {
        return (
            <>
                <Login dispatchUser={dispatchUser} />
                <Register dispatchUser={dispatchUser} />
            </>
        )
    }
}
