import Todo from './Todo'
export default function TodoList ({todo = []}) {
    return (
        <div>
            {todo.length === 0 && <h2>No todos found.</h2>}
            {todo.length > 0 && todo.map((p, i) => <Todo {...p} key={p._id || p.id} />)}
        </div>
    )
}
