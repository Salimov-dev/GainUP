import React, { useEffect, useState } from "react";
// Librares
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// Utils
import { handleKeyDown } from "../../../utils/handleKeyDown";
import { phoneFormat } from "../../../utils/phoneFormat";
import { validator } from "../../../utils/validator";
// Components
import ClearFormButton from "../../common/buttons/formButtons/ClearFormButton";
import CloseFormButton from "../../common/buttons/formButtons/CloseFormButton";
import { InputField, RadioField, SelectField } from "../../common/forms";
import CreateNewManagerButton from "./buttons/CreateNewManagerButton";
import SaveNewManagerButton from "./buttons/SaveNewManagerButton";
import { VerticalDividerForm } from "../../common/dividers";
// Store
import { getUserAccessRoot } from "../../../store/userAccessRoot.store";
import { getManagersStatus } from "../../../store/managerStatus.store";

const ManagerForm = ({ onAddManager, onEditManager, editingManager }) => {
  const managersStatus = useSelector(getManagersStatus());
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    // created_at: Date.now(),
    firstName: editingManager ? editingManager.firstName : "",
    surName: editingManager ? editingManager.surName : "",
    lastName: editingManager ? editingManager.lastName : "",
    managerStatus: editingManager ? editingManager.managerStatus : "",
    sex: editingManager ? editingManager.sex : "male",
    phoneNumber: editingManager ? editingManager.phoneNumber : "",
    email: "",
    password: "",
    startDateOfJobOffer: editingManager
      ? editingManager.startDateOfJobOffer
      : "",
    expiresDateOfJobOffer: editingManager
      ? editingManager.expiresDateOfJobOffer
      : "",
    quantityOfOpenStore: editingManager
      ? editingManager.quantityOfOpenStore
      : "",
    dateOfStartVacation: editingManager
      ? editingManager.dateOfStartVacation
      : "",
    dateOfEndVacation: editingManager ? editingManager.dateOfEndVacation : "",
    userAccessRoot: editingManager ? editingManager.userAccessRoot : "",
  });
  const userAccessRoot = useSelector(getUserAccessRoot());
  const navigate = useNavigate();

  const validatorConfig = {
    firstName: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите имя без цифр",
      },
    },
    surName: {
      isRequired: {
        message: "Отчество обязательно для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите отчество без цифр",
      },
    },
    lastName: {
      isRequired: {
        message: "Фамилия обязательна для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите фамилию без цифр",
      },
    },
    quantityOfOpenStore: {
      isRequired: {
        message: "Количество магазинов обязательно для заполнения",
      },
      isDigitalSymbol: {
        message: "Введите только цифры",
      },
    },
    startDateOfJobOffer: {
      isRequired: {
        message: "Дата трудоуйстроства обязательна для заполнения",
      },
    },
    expiresDateOfJobOffer: {
      isRequired: {
        message: "Дата окончания договора обязательна для заполнения",
      },
    },
    // dateOfStartVacation:  {
    //   isRequired: {
    //     message: "Дата начала отпуска обязательна для заполнения",
    //   },
    // },
    // dateOfEndVacation: {
    //   isRequired: {
    //     message: "Дата окончания отпуска обязательна для заполнения",
    //   },
    // },
    managerStatus: {
      isRequired: {
        message: "Выберите статус сотрудника",
      },
    },
    sex: {
      isRequired: {
        message: "Выберите пол сотрудника",
      },
    },
    phoneNumber: {
      isRequired: {
        message: "Номер телефона обязателен для заполнения",
      },
      isDigitalSymbol: {
        message: "Введите только цифры",
      },
      minLength: {
        message: "Введите не менее 10 цифр",
        value: 10,
      },
    },
    email: {
      isRequired: {
        message: "Email обязателен для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isDigitalSymbol: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      minLength: {
        message: "Пароль должен содержать не менее 8 символов",
        value: 8,
      },
    },
  };

  const managersStatusList = managersStatus?.map((status) => ({
    label: status.name,
    value: status._id,
  }));

  const userAccessRootList = userAccessRoot?.map((root) => ({
    label: root.name,
    value: root._id,
  }));


  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  const handleClearForm = () => {
    const copyData = {};
    for (const key in data) {
      if (key.length > 0) {
        copyData[key] = "";
      }
      if (key === "sex") {
        copyData[key] = "male";
      }
    }
    setData(copyData);
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleCloseForm = () => {
    if (
      window.confirm("Внесенные изменения не сохраняться, закрыть страницу?")
    ) {
      handleClearForm();
      toast.success(
        editingManager
          ? "Изменение менеджера закрыто без изменений"
          : "Создание менеджера закрыто без изменений"
      );
      navigate(`managers`);
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  for (const key in data) {
    if (data[key] !== "male" && data[key].length > 0) {
      window.onbeforeunload = () => {
        return "Уверены, что хотите закрыть страницу?";
      };

      window.onpopstate = () => {
        if (
          window.confirm(
            "Внесенные изменения не сохраняться, закрыть создание нового менеджера?"
          )
        ) {
          toast.success("Создание менеджера закрыто без изменений");
          return navigate(`/managers`);
        }

        return navigate(`/managers/create`);
      };
    }
  }

  return (
    <div style={{ width: "900px" }}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <InputField
            label="Фамилия:"
            name="lastName"
            value={data.lastName}
            placeholder="Введите фамилию"
            onChange={handleChange}
            error={errors.lastName}
            onKeyDown={handleKeyDown}
            hasValidation={true}
            maxLength="25"
          />
          <VerticalDividerForm />
          <InputField
            label="Имя:"
            name="firstName"
            value={data.firstName}
            placeholder="Введите имя"
            onChange={handleChange}
            error={errors.firstName}
            onKeyDown={handleKeyDown}
            hasValidation={true}
            autoFocus
            maxLength="25"
          />
        </div>
        <div className="d-flex">
          <InputField
            label="Отчество:"
            name="surName"
            value={data.surName}
            placeholder="Введите отчество"
            onChange={handleChange}
            error={errors.surName}
            onKeyDown={handleKeyDown}
            hasValidation={true}
            maxLength="25"
          />
          <VerticalDividerForm />
          <InputField
            label="Номер телефона*:"
            name="phoneNumber"
            value={phoneFormat(data.phoneNumber)}
            placeholder="Введите номер мобильного телефона"
            onChange={handleChange}
            error={errors.phoneNumber}
            onKeyDown={handleKeyDown}
            maxLength="10"
            addon="☏"
            hasValidation
            tooltipTitle="Введите телефон в формате: 9998887766, 5554433, 8126665533. Далее система сама отформатирует его."
          />
        </div>
        <div className="d-flex mb-2">
          <InputField
            label="Количество открытых магазинов:"
            name="quantityOfOpenStore"
            value={data.quantityOfOpenStore}
            placeholder="Введите количество магазинов"
            onChange={handleChange}
            error={errors.quantityOfOpenStore}
            onKeyDown={handleKeyDown}
            hasValidation={true}
            maxLength="3"
          />
          <VerticalDividerForm />
          <SelectField
            label="Действующий статус менеджера:"
            onChange={handleChange}
            name="managerStatus"
            options={managersStatusList}
            defaultOption="Выберите статус менеджера"
            value={data.managerStatus}
            error={errors.managerStatus}
            onKeyDown={handleKeyDown}
            hasValidation
          />
        </div>
        <div>
          <RadioField
            label="Пол:"
            options={[
              { name: "Мужской", value: "male" },
              { name: "Женский", value: "female" },
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            error={errors.sex}
            onKeyDown={handleKeyDown}
            hasValidation={true}
          />
        </div>
        <div className="d-flex">
          <InputField
            label="Дата трудоустройства:"
            type="date"
            name="startDateOfJobOffer"
            onChange={handleChange}
            value={data.startDateOfJobOffer}
            error={errors.startDateOfJobOffer}
            onKeyDown={handleKeyDown}
            hasValidation
          />
          <VerticalDividerForm />
          <InputField
            label="Дата окончания договора:"
            type="date"
            name="expiresDateOfJobOffer"
            onChange={handleChange}
            value={data.expiresDateOfJobOffer}
            error={errors.expiresDateOfJobOffer}
            onKeyDown={handleKeyDown}
            hasValidation
          />
        </div>
        <VerticalDividerForm />
          <div className="d-flex container-fluid p-0">
            <div className="w-100">
              <InputField
                label="Дата начала отпуска:"
                type="date"
                name="dateOfStartVacation"
                onChange={handleChange}
                value={data.dateOfStartVacation}
                // error={errors.dateOfStartVacation}
                // hasValidation
                onKeyDown={handleKeyDown}
              />
            </div>
            <VerticalDividerForm />
            <div className="w-100">
              <InputField
                label="Дата окончания отпуска:"
                type="date"
                name="dateOfEndVacation"
                onChange={handleChange}
                value={data.dateOfEndVacation}
                // error={errors.dateOfEndVacation}
                // hasValidation
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        
        {!editingManager ? (
          <>
            <div className="d-flex justify-content-between">
              <InputField
                label="Электронная почта (login в CRM):"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                onKeyDown={handleKeyDown}
                hasValidation
                maxLength="30"
                addon="@"
              />
              <VerticalDividerForm />
              <InputField
                label="Пароль (password в CRM):"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                error={errors.password}
                hasValidation
                maxLength="12"
              />
            </div>
          </>
        ) : (
          <br />
        )}
        <SelectField
          label="Права доступа менеджера:"
          onChange={handleChange}
          name="userAccessRoot"
          options={userAccessRootList}
          defaultOption="Выберите уровень доступа пользователя"
          value={data.userAccessRoot}
        />
        <br />

        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            {!editingManager ? (
              <CreateNewManagerButton
                onAddManager={onAddManager}
                isValid={isValid}
                data={data}
              />
            ) : (
              <SaveNewManagerButton data={data} onEditManager={onEditManager} />
            )}
          </div>
          <div>
            <ClearFormButton onClearForm={handleClearForm} />
            <CloseFormButton onCloseForm={handleCloseForm} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManagerForm;
