import { useState } from "react";
import { useResource } from "react-request-hook";

export default function Todo ({ title, description, author, completed, dateCompleted, id }) {
    const today = new Date(Date.now());
    const dateCreated = today.toDateString();

    const [completedCheck, setCompleted] = useState(completed);
    const [dateCompletedNew, setDateCompleted] = useState(dateCompleted);

    const [todo, updateTodo] = useResource(({ title, description, author, completedCheck, dateCompletedNew, id }) => ({
        url: "/todos/" + id,
        method: "put",
        data: { title, description, author, completed: completedCheck, dateCompleted: dateCompletedNew, id },
      }));

    const updateCompleted = () => {
        if (completedCheck === false) {
            setDateCompleted(new Date(Date.now()).toDateString());
        } else {
            setDateCompleted("");
        }
        setCompleted(!completedCheck);
        const toggledTodo = { title, description, author, completed: completedCheck, dateCompleted: dateCompletedNew, id }
        updateTodo(toggledTodo);
    }


    return (
        <div>
        <h3>{title}</h3>
        <div>{description}</div>
        <br />

        <div>
            <input type="checkbox" id="completedBox" name="completedBox" checked={completedCheck} onClick={updateCompleted}/>
            <label htmlFor="completedBox">Completed</label>
        </div>

        <i>Created by <b>{author}</b></i>
        <div>Created on {dateCreated}</div>
        {completedCheck && (
        <span style={{ color: "green" }}>{dateCompletedNew}</span>
      )}
        </div>
    )
} 