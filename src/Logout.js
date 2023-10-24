export default function Logout({ user, dispatchUser }) {
    return (
        <form onSubmit={e => { 
            e.preventDefault(); 
            //setUser("")
            dispatchUser({ type: "LOGOUT"})
            }}
        >
            Logged in as: <b>{user}</b>
            <input type="submit" value="Logout" />
        </form>
    )
}