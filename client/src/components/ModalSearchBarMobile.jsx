import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ModalSearchBarMobile.css";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiUrl = import.meta.env.VITE_APP_API_URL;

function ModalSearchBarMobile({ closeModal }) {
  const url = `${apiUrl}/discover/movie?api_key=${apiKey}`;
  const [urlSearch, setUrlSearch] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const results = response.data.results.filter((data) =>
          data.title.toLowerCase().includes(value.toLowerCase())
        );
        setUrlSearch(results);
      })
      .catch((err) => console.error(err));
  }, [url, value]);

  const handleMovieClick = (movieId) => {
    navigate(`/film/${movieId}`);
    closeModal(false);
    document.body.classList.remove("active");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleModal = () => {
    closeModal(false);
    document.body.classList.remove("active");
  };

  return (
    <div>
      <div className="modal-background">
        <div className="modal-container">
          <button
            type="button"
            className="button-mobile-search-bar"
            onClick={handleModal}
          >
            {" "}
            X{" "}
          </button>
          <div className="input-mobile-box">
            <input
              type="text"
              name="search-mobile"
              id="search-mobile"
              placeholder="Search ..."
              className="input-mobile"
              value={value}
              onChange={handleChange}
            />
          </div>
          <section className="box-search-section">
            <div className="search-section">
              {urlSearch.map((movie) => (
                <p
                  key={movie.title}
                  className="link"
                  role="presentation"
                  onClick={() => handleMovieClick(movie.id)}
                  onKeyDown={() => handleMovieClick(movie.id)}
                >
                  {movie.title}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ModalSearchBarMobile;

ModalSearchBarMobile.propTypes = {
  closeModal: PropTypes.bool.isRequired,
};
