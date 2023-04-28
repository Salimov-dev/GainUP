import React, { useEffect, useState } from "react";
// Utils
import { validator } from "../utils/validator";
// Components
import { TextArea, AddFile } from "../components/common/forms";
import Button from "../components/common/buttons/button";
import Navbar from "../components/UI/navbar/Navbar";
import Header from "../components/common/Header";

const FeedBack = () => {
  const [data, setData] = useState({ feedBackMessage: "", addFile: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    feedBackMessage: {
      isRequired: {
        message: "Обязательно введите текст сообщения",
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

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={"Обратная связь"} />
        <br />
        <p>
          Вам не хватает функционала в CRM или нашли ошибку? <br />
          Есть предложение, как сделать лучше?
          <br /> А может, у Вас есть гениальная идея? <br />
          Смело пишите в форме обратной связи!
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <TextArea
              label="Текст сообщения:"
              name="feedBackMessage"
              value={data.feedBackMessage}
              placeholder="Введите сообщение"
              onChange={handleChange}
              style={{ height: "150px", width: "585px" }}
              error={errors.feedBackMessage}
              autoFocus={true}
              hasValidation
            />
          </div>
          <AddFile
            label="Прикрепить файл:"
            name="addFile"
            style={{ width: "585px" }}
            hasValidation={false}
            value={data.addFile}
            onChange={handleChangeAddFile}
          />
          <Button styles="primary" text="Отправить" disabled={!isValid} />
        </form>
      </div>
    </>
  );
};

export default FeedBack;
