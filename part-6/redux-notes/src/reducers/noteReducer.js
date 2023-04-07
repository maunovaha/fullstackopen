const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload); // or `return [...state, action.payload];`
    case 'TOGGLE_IMPORTANCE':
      return state.map(item => item.id === action.payload.id ? { ...item, important: !item.important } : item);
    default:
      return state;
  }
};

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  };
};

export default noteReducer;
