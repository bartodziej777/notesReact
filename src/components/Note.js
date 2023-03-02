import "./Note.scss";
import { GoPin, GoPencil } from "react-icons/go";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteAdd, noteEdit } from "../store";

export default function Note({ id, onClick: onClose }) {
  const dispatch = useDispatch();

  const getedNote = useSelector((state) =>
    state.notesList.data.filter((note) => note.id === id)
  );

  let initialState;
  let isNew = false;

  if (getedNote.length) {
    initialState = { ...getedNote[0] };
  } else {
    initialState = { title: "", content: "", pinned: false, color: 0 };
    isNew = true;
  }

  const [editMode, setEditMode] = useState(isNew);

  const [note, setNote] = useState(initialState);

  const handleOnClickPin = () => {
    setNote({ ...note, pinned: !note.pinned });
  };

  const handleOnClickEdit = () => {
    setEditMode(!editMode);
  };

  const handleOnChangeTitle = (e) => {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  };

  const handleOnChangeContent = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  const handleOnClickColor = (e) => {
    const element = e.target.closest(".note__color");
    if (!element) return;

    const color = element.dataset.color;
    const noteElement = document.querySelector(".note");
    for (let i = 0; i <= 5; i++) {
      noteElement.classList.remove(`note--${i}`);
    }
    noteElement.classList.add(`note--${color}`);
    setNote({ ...note, color });
  };

  const handleOnClickClose = () => {
    onClose(-1);

    setEditMode(false);
    if (isNew) {
      if (note.title.length || note.content.length) {
        dispatch(noteAdd({ ...note }));
      }
    } else dispatch(noteEdit(note));
  };

  return (
    <>
      <div onClick={handleOnClickClose} className="note__background"></div>
      <div className={`note note--${note.color}`}>
        <div className="note__buttons">
          <GoPin
            className={
              note.pinned
                ? "note__btn-pin note__btn-pin--active"
                : "note__btn-pin"
            }
            onClick={handleOnClickPin}
          />
          <GoPencil
            className={
              editMode
                ? "note__btn-edit note__btn-edit--active"
                : "note__btn-edit"
            }
            onClick={handleOnClickEdit}
          />
        </div>
        <div>
          {editMode ? (
            <form
              className="note__content"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={note.title}
                onChange={handleOnChangeTitle}
                placeholder="Note title"
                className="note__content__title"
              />
              <textarea
                value={note.content}
                onChange={handleOnChangeContent}
                placeholder="Type something..."
              />
            </form>
          ) : (
            <div className="note__content">
              <p>{note.title}</p>
              <textarea readOnly={true} value={note.content}></textarea>
            </div>
          )}
        </div>
        <div className="note__toolbar">
          {editMode ? (
            <div className="note__colors" onClick={handleOnClickColor}>
              <button
                className="note__color note__color--0"
                data-color="0"
              ></button>
              <button
                className="note__color note__color--1"
                data-color="1"
              ></button>
              <button
                className="note__color note__color--2"
                data-color="2"
              ></button>
              <button
                className="note__color note__color--3"
                data-color="3"
              ></button>
              <button
                className="note__color note__color--4"
                data-color="4"
              ></button>
              <button
                className="note__color note__color--5"
                data-color="5"
              ></button>
            </div>
          ) : (
            ""
          )}
          <button className="note__btn-close" onClick={handleOnClickClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
