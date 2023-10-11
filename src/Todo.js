import { useState } from "react";

export default function Todo ({ title, description, author }) {
    const today = new Date(Date.now());
    const dateCreated = today.toDateString();
    let dateCompleted = "uncompleted";

    const [completed, setCompleted] = useState(false);

    const updateCompleted = () => {
        if (completed === false) {
            setCompleted(!completed);
            dateCompleted = new Date(Date.now()).toDateString();
        } else {
            setCompleted(!completed);
            dateCompleted = "uncompleted";
        }
    }


    return (
        <div>
        <h3>{title}</h3>
        <div>{description}</div>
        <br />

        <div>
            <input type="checkbox" id="completedBox" name="completedBox" onChange={updateCompleted}/>
            <label for="completedBox">Completed</label>
        </div>

        <i>Created by <b>{author}</b></i>
        <div>Created on {dateCreated}</div>
        <div>Completed on: {dateCompleted}</div>
        </div>
    )
}