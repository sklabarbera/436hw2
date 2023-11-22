import { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";


export default function Todo ({ title, description, author, completed, dateCompleted, _id }) {
    const { state, dispatch } = useContext(StateContext); 
    const { user, todos } = state;
    console.log(_id);
    

    const today = new Date(Date.now());
    const dateCreated = today.toDateString();
    const [useID, setUseID] = useState(_id);

    const [completedCheck, setCompleted] = useState(completed);
    const [dateCompletedNew, setDateCompleted] = useState(dateCompleted);

    const [todo, updateTodo] = useResource(({ completedCheck, dateCompletedNew, useID }) => ({
        url: "/post/" + useID,
        method: "patch",
        headers: { Authorization: `${state?.user?.access_token}` },
        data: { complete: completedCheck, dateCompleted: dateCompletedNew },
      }));

    const updateCompleted = () => {
        if (completedCheck === false) {
            setDateCompleted(new Date(Date.now()).toDateString());
        } else {
            setDateCompleted("");
        }
        setCompleted(!completedCheck);
        const toggledTodo = { title, description, author, completed: completedCheck, dateCompleted: dateCompletedNew, useID }
        updateTodo(toggledTodo);
    }

    const [deleteButton, updateDeleteButton] = useResource(({ useID }) => ({
        url: "/post/" + useID,
        method: "delete",
        headers: { Authorization: `${state?.user?.access_token}` },
        data: { id: useID },
      }));

    function handleDelete () {
        updateDeleteButton(useID);
    }

    return (
        <div>
        <h3>{title}</h3>
        <div>{description}</div>
        <br />

        <div>
            <input type="checkbox" id="completedBox" name="completedBox" checked={completedCheck} onChange={updateCompleted}/>
            <label htmlFor="completedBox">Completed</label>
        </div>

        <i>Created by <b>{user.username}</b></i>
        <div>Created on {dateCreated}</div>
        {completedCheck && (
        <span style={{ color: "green" }}>{dateCompletedNew}</span>
      )}
      <input type="submit" value="Delete" onSubmit={handleDelete} />
        </div>
    )
} 