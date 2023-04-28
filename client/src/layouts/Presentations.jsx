import React, { useEffect, useState } from "react";
// Utils
import { handleKeyDown } from "../utils/handleKeyDown";
import { validator } from "../utils/validator";
import useMockData from "../utils/mockData";
// Components
import { HorizontalDividerForm } from "../components/common/dividers";
import { TextArea, AddFile } from "../components/common/forms";
import Button from "../components/common/buttons/button";
import Navbar from "../components/UI/navbar/Navbar";
import Header from "../components/common/Header";

const Presentations = () => {
  const [data, setData] = useState({ presentationLetter: "", addFile: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    presentationLetter: {
      isRequired: {
        message: "Обязательно сопроводите презентацию коротким комментарием",
      },
    },
    addFile: {
      isRequired: {
        message: "Приложите файл с перезентацией",
      },
    },
  };

  const handleChangeAddFile = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const { error, initialize, progress, statusData } = useMockData();
  const handleLoadBase = () => {
    initialize();
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={"Презентации объектов"} />
        <form onSubmit={handleSubmit}>
          <AddFile
            label="Прикрепить файл:"
            name="addFile"
            style={{ width: "585px" }}
            value={data.addFile}
            onChange={handleChangeAddFile}
            error={errors.addFile}
            hasValidation={true}
          />
          <div>
            <TextArea
              label="Комментарий к презентации:"
              name="presentationLetter"
              value={data.presentationLetter}
              placeholder="Введите комментарий"
              onChange={handleChange}
              style={{ height: "70px", width: "585px" }}
              error={errors.presentationLetter}
              hasValidation
              autoFocus={true}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button styles="primary" text="Отправить" disabled={!isValid} />
        </form>
        <HorizontalDividerForm />
        <div>
          <h3>иницииализация мокдаты</h3>
          <ul className="p-0">
            <li>Status: {statusData}</li>
            <li>Progress: {progress}</li>
            {error && <li>error: {error}</li>}
          </ul>
          <button className="btn btn-danger" onClick={handleLoadBase}>
            Загрузить
          </button>
        </div>
      </div>
    </>
  );
};

export default Presentations;
