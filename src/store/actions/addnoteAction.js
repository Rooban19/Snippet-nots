export const ADD_NOTE = 'ADD_NOTE';

export const addNote = (note) => {
  console.log('Adding the note action called');
  return { type: ADD_NOTE, note: note };
};
