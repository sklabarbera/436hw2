import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, dispatch }) {
    
    if (user) { 
        return <Logout user={user} dispatchUser={dispatch} /> 
    } else {
        return (
            <>
                <Login dispatchUser={dispatch} />
                <Register dispatchUser={dispatch} />
            </>
        )
    }
}
