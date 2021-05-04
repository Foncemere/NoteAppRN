let noteID = 0;

export const addNote = (item) => ({
  type: "ADD_NOTE",
  id: ++noteID,
  item,
});

export const deleteNote = (noteID) => ({
  type: "DELETE_NOTE",
  id: noteID,
});

export const editNote = (noteID, item) => ({
  type: "EDIT_NOTE",
  id: noteID,
  item,
});
