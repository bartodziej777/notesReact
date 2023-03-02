import "./NoteMini.scss";

export default function NoteMini({ note, onClick }) {
  return (
    <div
      className={`note-mini note-mini--${note.color}`}
      onClick={() => onClick(note.id)}
    >
      <p className="note-mini__title">{note.title}</p>
      <textarea
        className="note-mini__content"
        readOnly={true}
        rows={4}
        value={note.content}
      ></textarea>
    </div>
  );
}
