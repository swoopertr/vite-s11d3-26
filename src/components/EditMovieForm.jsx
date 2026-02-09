import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
// [ ] EditMovieForm.jsxde idyi useParams hooku ile al.
//[ ] Component mount olduğunda ilgili filmin bilgisini apiden GET isteği ile al ve movie stateine aktar: https://nextgen-project.onrender.com/api/s11d3/movies/:id
//[ ] Düzenleme formu submit edildiğinde çalışmıyor. Gerekli api isteğini ekle: PUT https://nextgen-project.onrender.com/api/s11d3/movies/:id


const EditMovieForm = ({ setMovies }) => {
  const { id } = useParams();
  let history = useHistory();
  console.log("id", id);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://nextgen-project.onrender.com/api/s11d3/movies/${id}`)

      .then(function (response) {
        // handle success
        console.log(response.data);
        setMovie(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [id]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://nextgen-project.onrender.com/api/s11d3/movies/${id}`, movie)
      .then(function (response) {
        // handle success
        console.log("put", response.data);
        setMovies(response.data);
        history.push(`/movies/${id}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  };

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="bg-white rounded-md shadow flex-1 dark:bg-slate-800 dark:text-white">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            Yeni Film Ekle <strong>{title}</strong>
          </h4>
        </div>
        <div className="px-5 py-3">
          <div className="py-2">
            <label htmlFor="title" className="block pb-1 text-lg">
              Title
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="director" className="block pb-1 text-lg">
              Director
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={director}
              onChange={handleChange}
              name="director"
              id="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="genre" className="block pb-1 text-lg">
              Genre
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={genre}
              onChange={handleChange}
              name="genre"
              id="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="metascore" className="block pb-1 text-lg">
              Metascore
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={metascore}
              onChange={handleChange}
              name="metascore"
              id="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label htmlFor="description" className="block pb-1 text-lg ">
              Description
            </label>
            <textarea
              className="dark:bg-slate-800 dark:text-white"
              value={description}
              onChange={handleChange}
              name="description"
              id="description"
            ></textarea>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <Link to={`/movies/${id}`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
