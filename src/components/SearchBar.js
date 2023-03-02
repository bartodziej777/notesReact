import "./SearchBar.scss";
import { updateSearchTerm } from "../store";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  return (
    <>
      <form className="searchbar">
        <input
          type="text"
          placeholder="Search note..."
          className="searchbar__input"
          onChange={handleOnChange}
        />
      </form>
    </>
  );
}

//IMPLEMENT SEARCHING
