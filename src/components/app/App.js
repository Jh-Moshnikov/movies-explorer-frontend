import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/Auth';
import Preloader from '../Preloader/Preloader';


function App() {
  let location = useLocation();
  const navigate = useNavigate();

  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  //const isLoggedIn = location.pathname === '/' ? false : true;

  const [currentUser, setCurrentUser] = useState({});
  const [apiErrors, setApiErrors] = useState({
    login: {},
    register: {},
    profile: {},
    movies: {}
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isOK, setIsOK] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const mainApi = new MainApi({
    url: 'https://api.moviesbook.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  // очишяем поля от ошибок
  useEffect(() => {
    setApiErrors({
      login: {},
      register: {},
      profile: {}
    });
  }, [location]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(location.pathname);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          // удаляем из localstorage несовпадающий токен
          if (error.status === 401) {
            localStorage.removeItem('jwt');
            setIsLoading(false);
          }
          console.log(error);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((error) => {
          console.log(`Что-то пошло не так... (${error})`);
        });
    isLoggedIn &&
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        })
        .catch((error) => console.log(error));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        moviesApi
          .getMovies()
          .then((movies) => {
            console.log(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
            setMovies(movies);
            setApiErrors({ ...apiErrors, movies: {} });
          })
          .catch((error) => {
            setApiErrors({ ...apiErrors, movies: error });
            console.log(error);
          });
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

  const handleLogin = (values) => {
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((error) => {
        setIsOK(false);
        setApiErrors({ ...apiErrors, login: error });
      });
  };

  const handleRegister = (values) => {
    auth
      .register(values.name, values.email, values.password)
      .then((res) => {
        handleLogin(values);
      })
      .catch((error) => {
        setIsOK(false);
        setApiErrors({ ...apiErrors, register: error });
        console.log(error);
      });
  };

  const handleUpdateUser = (user) => {
    mainApi
      .editProfile(user)
      .then(() => {
        setApiErrors({ ...apiErrors, profile: {} });
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email
        });
        setIsOK(true);
      })
      .catch((error) => {
        setIsOK(false);
        setApiErrors({ ...apiErrors, profile: error });
        console.log(error);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    setIsLoggedIn(false);
  };

  const handleLikeMovie = (movie, isLiked, id) => {
    if (isLiked) {
      handleDeleteMovie(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteMovie = (id) => {
    const searchedSavedMovies = JSON.parse(
      localStorage.getItem('searchedSavedMovies')
    );

    mainApi
      .deleteMovie(id)
      .then((res) => {
        const updatedSavedMovies = savedMovies.filter(
          (movie) => movie._id !== id
        );
        setSavedMovies(updatedSavedMovies);

        // Чтобы обновить список фильмов в searchedSavedMovies при удалении или лайке-дизлайке
        if (searchedSavedMovies) {
          const updatedSearchedSavedMovies = searchedSavedMovies.filter(
            (movie) => movie._id !== id
          );

          localStorage.setItem(
            'searchedSavedMovies',
            JSON.stringify(updatedSearchedSavedMovies)
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={{ currentUser }}>
          {headerPaths.includes(location.pathname) ? (
            <Header isLoggedIn={isLoggedIn} />
          ) : (
            ''
          )}
          <main>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route path="/signup" element={<Register
                onRegister={handleRegister}
                isLoggedIn={isLoggedIn}
                apiErrors={apiErrors} />} />

              <Route path="/signin" element={<Login
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                apiErrors={apiErrors} />} />

              <Route path="/movies" element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  movies={movies}
                  savedMovies={savedMovies}
                  onLikeMovie={handleLikeMovie}
                  apiErrors={apiErrors} />} />

              <Route path="/profile" element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  apiErrors={apiErrors}
                  isOK={isOK}
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser} />} />

              <Route path="/saved-movies" element={
                <ProtectedRoute
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                  isLoggedIn={isLoggedIn} />} />

              <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
            </Routes>
          </main>
          {footerPaths.includes(location.pathname) ? <Footer /> : ''}
        </CurrentUserContext.Provider>
      )}
    </div>

  );
}

export default App;
