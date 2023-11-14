import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo'
export default function TodoList ({todo = []}) {
    return (
        <div>
            { todo.map((p, i) => 
                <Todo {...p} key={uuidv4()} />)}
        </div>
    )
}
