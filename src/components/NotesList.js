import "./NotesList.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import NoteMini from "./NoteMini";
import Note from "./Note";

export default function NoteList() {
  const notes = useSelector(({ notesList: { data, searchTerm } }) =>
    data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const [noteSettings, setNoteSettings] = useState({
    id: -1,
    isOpen: false,
  });

  const handleOnClickNote = (id) => {
    setNoteSettings({
      id: id,
      isOpen: !noteSettings.isOpen,
    });
  };

  const notesPinned = notes
    .filter((note) => note.pinned)
    .map((note) => (
      <NoteMini key={note.id} note={note} onClick={handleOnClickNote} />
    ));
  const notesOthers = notes
    .filter((note) => !note.pinned)
    .map((note) => (
      <NoteMini key={note.id} note={note} onClick={handleOnClickNote} />
    ));

  return (
    <>
      <div className="notes-list">
        <button
          className="notes-list__btn-add"
          onClick={() => handleOnClickNote(-1)}
        >
          + Add note
        </button>
        <h2>Pinned</h2>
        <div className="notes-list__list">{notesPinned}</div>
        <h2>Others</h2>
        <div className="notes-list__list">{notesOthers}</div>
      </div>
      {noteSettings.isOpen ? (
        <Note id={noteSettings.id} onClick={handleOnClickNote} />
      ) : (
        ""
      )}
    </>
  );
}
