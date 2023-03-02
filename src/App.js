import "./App.scss";
import SearchBar from "./components/SearchBar";
import NoteList from "./components/NotesList";

function App() {
  return (
    <div className="container">
      <header>
        <h1>.notes</h1>
        <SearchBar />
      </header>
      <main>
        <NoteList />
      </main>
    </div>
  );
}

export default App;
