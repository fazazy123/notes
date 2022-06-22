// Styling Notes
'use strict';

//1. Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    return [];
  }
};

//Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

const generateNoteDOM = (note) => {
  const noteE1 = document.createElement('div');
  const textEl = document.createElement('a');
  const statusEl = document.createElement('p');

  //ternary operator
  note.title.length > 0
    ? (textEl.textContent = note.title)
    : (textEl.textContent = 'Unnamed note');
  textEl.classList.add('list-item__title'); //js css

  //setup link href to include hash with id
  textEl.setAttribute('href', `/edit.html#${note.id}`); //<a href="/edit.html#${note.id}">Coding JSss</a>
  noteE1.classList.add('list-item'); //js css
  noteE1.appendChild(textEl);

  //setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add('list-item__subtitle'); //js css
  noteE1.appendChild(statusEl);

  return noteE1;
};

const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

//3 Render application note
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector('#notes');
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = '';

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteE1 = generateNoteDOM(note);
      notesEl.appendChild(noteE1);
    });
  } else {
    const emptyMessage = document.createElement('h1');
    emptyMessage.textContent = 'No notes to render'; //<p>No notes to render</p>
    emptyMessage.classList.add('empty-message'); //js css
    notesEl.appendChild(emptyMessage);
  }
};

//4. Save the notes to localStorage
const saveNotes = (notes) =>
  localStorage.setItem('notes', JSON.stringify(notes));

//Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;
