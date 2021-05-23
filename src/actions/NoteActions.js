export const addNote = (item, Noteid) => ({
  type: "ADD_NOTE",
  id: Noteid,
  item,
});

export const deleteThisNote = (noteID) => ({
  type: "DELETE_NOTE",
  noteID,
});

export const editNote = (noteID, item) => ({
  type: "EDIT_NOTE",
  id: noteID,
  item,
});

export const renderNotes = (item) => ({
  type: "RENDER_NOTES",
  item,
});
