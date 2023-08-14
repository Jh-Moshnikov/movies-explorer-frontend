import './Profile.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useContext, useEffect, useState } from 'react';
import { validateEmail, validateName } from '../../utils/Validation';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

const Profile = ({ onSignOut, onUpdateUser, apiErrors, isOK }) => {
  const { values, handleChange, isValid, setValues, setIsValid } =
    useFormAndValidation();
  const { currentUser } = useContext(CurrentUserContext);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }
  }, [currentUser, setIsValid, setValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  useEffect(() => {
    if (isOK) {
      setShowSaveBtn(false);
      setShowSuccessMsg(true);
    }
  }, [isOK, apiErrors]);

  return (
    <section className="profile">
      <h1 className="profile__welcome-message">Привет, {currentUser.name}!</h1>
      <form
        onSubmit={onSubmit}
        className="profile-form"
      >
        <div className="profile-form__input-field">
          <label className="profile-form__label" htmlFor="user-name-input">
            Имя
          </label>
          <input
            className="profile-form__input"
            id="user-name-input"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            type="text"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            disabled={!showSaveBtn}
            required
          />
          <span
            className={`profile-form__input-error`}
          >
            {validateName(values.name).message}
          </span>
        </div>

        <div className="profile-form__input-field">
          <label className="profile-form__label" htmlFor="user-email-input">
            E-mail
          </label>
          <input
            className="profile-form__input"
            id="user-email-input"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            type="email"
            placeholder="Введите почту"
            minLength="2"
            maxLength="40"
            disabled={!showSaveBtn}
            required
          />
          <span
            className={`profile-form__input-error profile-form__input-error_active`}
          >
            {validateEmail(values.email).message}
          </span>
        </div>

        <button
          type="button"
          className="profile-form__button profile-form__button-edit"
          onClick={(e) => {
            e.preventDefault();
            setShowSaveBtn(true);
            setShowSuccessMsg(false);
          }}
        >
          Редактировать
        </button>
        <button
          onClick={onSignOut}
          className="profile-form__button profile-form__button-signout"
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;