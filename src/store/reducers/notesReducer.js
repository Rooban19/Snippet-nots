import { ADD_NOTE } from '../actions/addnoteAction';

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return state.notes.push(action.note);
  }
  console.log(' STATE ', state);
  return state;
};

export default notesReducer;
