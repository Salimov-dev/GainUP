import React, { useEffect, useState } from "react";
// Librares
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Utils
import { handleKeyDown } from "../utils/handleKeyDown";
import { validator } from "../utils/validator";
// Components
import Button from "../components/common/buttons/button";
import { InputField } from "../components/common/forms";
// Icons
import logoCompany from "../img/UP_big.png";
import backgroundImage from "../img/background.jpg";
// Store
import { getAuthErrors, logIn } from "../store/users.store";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email обязателен для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
    },
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = location.state
      ? location.state.referrer.pathname
      : "/objects";
    dispatch(logIn(data)).then(() => {
      navigate(redirect, { replace: true });
    });
  };

  const testAccount = {
    email: "salimov.rent@mail.ru",
    password: "12asdAsq",
    stayOn: false,
  };

  const handleTestEnter = async (e) => {
    e.preventDefault();
    const redirect = location.state
      ? location.state.referrer.pathname
      : "/objects";
    dispatch(logIn(testAccount)).then(() => {
      navigate(redirect, { replace: true });
    });
  };

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-5 align">
            <form
              onSubmit={handleLogin}
              style={{
                width: "400px",
                backgroundColor: "white",
                margin: "0 auto",
              }}
              className="shadow p-5 rounded has-validate"
            >
              <div className="logo_container d-flex flex-column align-items-center">
                <img src={logoCompany} alt="logo" style={{ width: "60px" }} />
                <br />
                <h5>Введите логин и пароль для доступа</h5>
              </div>
              <br />
              <InputField
                label="Электронная почта:"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                onKeyDown={handleKeyDown}
                hasValidation
                autoFocus
              />
              <InputField
                label="Пароль:"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                error={errors.password}
                hasValidation={data.password.length > 0 ? false : true}
              />
              <br />
              <div className="d-flex flex-column align-items-center">
                {loginError && <p className="text-danger">{loginError}</p>}
                <Button styles="danger" text="Войти" disabled={!isValid} />
                <br />
                <Button
                  onClick={handleTestEnter}
                  text="Тестовый доступ"
                  styles="primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
