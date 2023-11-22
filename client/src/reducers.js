function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return {
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return null;
      default:
    return state;
  }
}

function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          completed: action.completed,
          dateCompleted: action.dateCompleted,
          id: action._id
        };
        return [newTodo, ...state];
        case "FETCH_TODOS":
            return action.todos;
        case "TOGGLE_TODO":
          return state;
      default:
        return state;
    }
  }

  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      todos: todoReducer(state.todos, action),
    };
  }