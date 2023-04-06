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

export default noteReducer;