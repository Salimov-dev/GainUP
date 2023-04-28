import React, { useEffect, useState } from "react";
// Librares
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// Utils
import { makeSeparatorDigit } from "../../../utils/makeSeparatorDigit";
import { handleKeyDown } from "../../../utils/handleKeyDown";
import { phoneFormat } from "../../../utils/phoneFormat";
import { validator } from "../../../utils/validator";
// Hooks
import useFindObject from "../../../hooks/useFindObject";
// Components
import ClearFormButton from "../../common/buttons/formButtons/ClearFormButton";
import CloseFormButton from "../../common/buttons/formButtons/CloseFormButton";
import FindObjectOnMap from "../../common/FindObjectOnMap/FindObjectOnMap";
import ObjectOnMap from "../../common/ObjectOnMap/ObjectOnMap";
import CreateObjectButton from "./buttons/CreateObjectButton";
import SaveObjectButton from "./buttons/SaveObjectButton";
import {
  InputField,
  TextArea,
  SelectField,
  CheckBox,
  RadioField,
} from "../../common/forms";
import {
  VerticalDividerForm,
  HorizontalDividerForm,
} from "../../common/dividers";
// Store
import { getWorkingPosition } from "../../../store/workingPosition.store";
import { getDistrictsSpbLO } from "../../../store/districtsSpbLO.store";
import { getStatusObject } from "../../../store/statusObject.store";

const ObjectForm = ({ objectId, editObject, onClick, onEditObject }) => {
  const workingPosition = useSelector(getWorkingPosition());
  const status = useSelector(getStatusObject());
  const districtsSpbLO = useSelector(getDistrictsSpbLO());
  const {
    findLocality,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const estateOptionsArray = [
    { name: "Да", value: "Да" },
    { name: "Нет", value: "Нет" },
    { name: "Неизвестно", value: "Неизвестно" },
  ];
  const estateOptionsUnknow = estateOptionsArray[2].value;
  const isUnknownPosition = workingPosition[8]._id;

  const [data, setData] = useState({
    city: "",
    adress: "",
    status: editObject ? editObject.status : "",
    district: editObject ? editObject.location.district : "",
    bookmark: editObject ? editObject.bookmark : false,
    contactPhone: editObject ? editObject.contact.phone : "",
    contactName: editObject ? editObject.contact.name : "",
    contactPosition: editObject
      ? editObject.contact.position
      : isUnknownPosition,
    contactEmail: editObject ? editObject.contact.email : "",
    rentPrice: editObject ? editObject.estateOptions.rentPrice : "",
    prepaidPrice: editObject ? editObject.estateOptions.prepaidPrice : "",
    rentalHolidays: editObject ? editObject.estateOptions.rentalHolidays : "",
    totalSquare: editObject ? editObject.estateOptions.totalSquare : "",
    rentSquare: editObject ? editObject.estateOptions.rentSquare : "",
    premisesHeight: editObject ? editObject.estateOptions.premisesHeight : "",
    premisesFloor: editObject ? editObject.estateOptions.premisesFloor : "",
    comment: editObject ? editObject.description.comment : "",
    fullDescription: editObject ? editObject.description.fullDescription : "",
    readyToRent: editObject
      ? editObject.accordTerms.readyToRent
      : estateOptionsUnknow,
    readyToContract: editObject
      ? editObject.accordTerms.readyToContract
      : estateOptionsUnknow,
    readyToRenovation: editObject
      ? editObject.accordTerms.readyToRenovation
      : "Неизвестно",
  });

  const districtsSpbLOList = districtsSpbLO?.map((dist) => ({
    label: dist.name,
    value: dist._id,
  }));

  const workingPositionList = workingPosition?.map((pos) => ({
    label: pos.name,
    value: pos._id,
  }));

  const statusList = status?.map((status) => ({
    label: status.name,
    value: status._id,
  }));

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [isValid, setIsValid] = useState(Object.keys(errors).length === 0);

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  const validatorConfig = {
    city: {
      isRequired: {
        message: "Выберите объект на карте",
      },
    },
    status: {
      isRequired: {
        message: "Выберите статус",
      },
    },
    contactPhone: {
      isDigitalSymbol: {
        message: "Введите только цифры",
      },
      minLength: {
        message: "Введите не менее 10 цифр",
        value: 10,
      },
    },
    rentPrice: {
      isDigitalSymbol: {
        message: "Введите сумму цифрами",
      },
    },
    prepaidPrice: {
      isDigitalSymbol: {
        message: "Введите сумму цифрами",
      },
    },
    rentalHolidays: {
      isDigitalSymbol: {
        message: "Введите сумму цифрами",
      },
    },
    totalSquare: {
      isDigitalSymbol: {
        message: "Введите общую площадь только цифрами",
      },
    },
    rentSquare: {
      isDigitalSymbol: {
        message: "Введите арендуемую площадь только цифрами",
      },
    },
    premisesHeight: {
      isDigitalSymbol: {
        message: "Введите высоту потолков только цифрами",
      },
      maxLength: {
        message: "Не более 4 символов",
        value: 4,
      },
    },
    contactName: {
      isCirilicSymbol: {
        message: "Введите корретное имя кириллицей",
      },
      isNoDigitalSymbol: {
        message: "Введите корретное имя без цифр",
      },
    },
    contactPosition: {
      isRequired: {
        message: "Введите должность",
      },
    },
    contactEmail: {
      isEmail: {
        message: "Почта введена некорректно",
      },
    },
    comment: {
      isRequired: {
        message: "Введите короткий комментарий",
      },
      minLength: {
        message: "Комментарий должен быть не менее 20 символов",
        value: 20,
      },
      maxLength: {
        message: "Комментарий должен быть не более 60 символов",
        value: 120,
      },
    },
    district: {
      isRequired: {
        message: "Выберите район",
      },
    },
    fullDescription: {
      isRequired: {
        message: "Введите подробное описание",
        value: 2000,
      },
      minLengthFullDescription: {
        message: "Описание должно иметь не менее 20 символов",
        value: 20,
      },
      maxLengthFullDescription: {
        message: "Описание должно иметь не более 2000 символов",
        value: 2000,
      },
    },
  };

  const handleCloseForm = () => {
    if (
      window.confirm("Внесенные изменения не сохраняться, закрыть страницу?")
    ) {
      handleClearForm();
      if (!objectId) {
        toast.success("Создание объекта закрыто без изменений");
        return navigate(`/objects`);
      }
      toast.success("Изменение объекта закрыто без изменений");
      navigate(`/objects/${objectId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleClearForm = () => {
    const copyData = {};
    for (const key in data) {
      if (key.length > 0) {
        copyData[key] = "";
      }
      if (key === "readyToRent") {
        copyData[key] = estateOptionsUnknow;
      }
      if (key === "readyToContract") {
        copyData[key] = estateOptionsUnknow;
      }
      if (key === "readyToRenovation") {
        copyData[key] = estateOptionsUnknow;
      }
    }
    setData(copyData);
  };

  useEffect(() => {
    validate();
  }, [data, findedObject]);

  // for (const key in data) {
  //   if (data[key] !== "Неизвестно" && data[key].length > 0) {
  //     window.onbeforeunload = () => {
  //       return "Уверены, что хотите закрыть страницу?";
  //     };
  //     window.onpopstate = () => {
  //       if (editObject) {
  //         if (
  //           window.confirm(
  //             "Внесенные изменения не сохраняться, закрыть изменение объекта?"
  //           )
  //         ) {
  //           toast.success("Изменение объекта закрыто без изменений");
  //           return navigate(`/objects/${objectId}`);
  //         }
  //         return navigate(`/objects/${objectId}/edit`);
  //       }
  //       if (
  //         window.confirm(
  //           "Внесенные изменения не сохраняться, закрыть создание объекта?"
  //         )
  //       ) {
  //         toast.success("Создание объекта закрыто без изменений");
  //         return navigate(`/objects`);
  //       }
  //       return navigate("/objects/create");
  //     };
  //   }
  // }

  return (
    <>
      {!editObject ? (
        <FindObjectOnMap />
      ) : (
        <div style={{ width: "900px" }} className="mb-3">
          <ObjectOnMap
            mapCenter={editObject.location}
            mapZoom={editObject.location.zoom}
            date={editObject.date}
            city={editObject.location.city}
            adress={editObject.location.adress}
            status={editObject.status.name}
            comment={editObject.description.comment}
          />
        </div>
      )}
      <form style={{ width: "900px" }} onSubmit={handleSubmit}>
        <div className="d-flex flex-column p-0">
          {!editObject ? (
            <div className="d-flex align-items-start">
              <InputField
                label="Населенный пункт:"
                name="city"
                placeholder="Поставьте метку на карте"
                value={data.city}
                options={Object.keys(findedObject).length > 0 && findLocality()}
                error={
                  Object.keys(findedObject).length > 0
                    ? delete errors.city
                    : errors.city
                }
                hasValidation
                disabled
              />
              <VerticalDividerForm />
              <InputField
                label="Адрес:"
                name="adress"
                value={
                  Object.keys(findedObject).length > 0 ? findedObject.name : ""
                }
                placeholder="Адрес подставится автоматически"
                disabled
              />
              <VerticalDividerForm />
              <SelectField
                label="Район:"
                name="district"
                value={data.district}
                options={districtsSpbLOList}
                defaultOption="Выберите район"
                onChange={handleChange}
                error={errors.district}
                hasValidation
              />
              <HorizontalDividerForm />
            </div>
          ) : null}

          <div className="d-flex">
            <InputField
              label="Как обращаться:"
              name="contactName"
              value={data.contactName}
              placeholder="Введите имя, фамилию или отчество"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.contactName.length === 0
                  ? delete errors.contactName
                  : errors.contactName
              }
              maxLength="60"
              autoFocus={true}
              addon="ФИО"
              hasValidation={data.contactName.length > 0 && true}
            />
            <VerticalDividerForm />
            <SelectField
              label="Должность:"
              name="contactPosition"
              value={data.contactPosition}
              options={workingPositionList}
              defaultOption="Выберите должность"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={
                !data.contactName.length &&
                !data.contactPhone.length &&
                !data.contactEmail.length &&
                true
              }
            />
          </div>
          <div className="d-flex">
            <InputField
              label="Телефон* :"
              name="contactPhone"
              value={phoneFormat(data.contactPhone)}
              placeholder="Введите телефон"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.contactPhone.length === 0
                  ? delete errors.contactPhone
                  : errors.contactPhone
              }
              maxLength="10"
              addon="☏"
              hasValidation={data.contactPhone.length > 0 && true}
              tooltipTitle="Введите телефон в формате: 9998887766, 5554433, 8126665533. Далее система сама отформатирует его."
            />
            <VerticalDividerForm />
            <InputField
              label="Почта:"
              name="contactEmail"
              value={data.contactEmail}
              placeholder="Введите e-mail"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.contactEmail.length === 0
                  ? delete errors.contactEmail
                  : errors.contactEmail
              }
              maxLength="30"
              addon="@"
              hasValidation={data.contactEmail.length > 0 && true}
            />
          </div>
          <HorizontalDividerForm />
          <div className="d-flex">
            <InputField
              label="АП, при которой готов сдать:"
              name="rentPrice"
              value={makeSeparatorDigit(data.rentPrice)}
              placeholder="Введите сумму"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.rentPrice.length === 0
                  ? delete errors.rentPrice
                  : errors.rentPrice
              }
              maxLength="9"
              addon="₽"
              hasValidation={data.rentPrice.length > 0 && true}
            />
            <VerticalDividerForm />
            <InputField
              label="Авансовый платёж:"
              name="prepaidPrice"
              value={makeSeparatorDigit(data.prepaidPrice)}
              placeholder="Введите сумму авансового платежа:"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.prepaidPrice.length === 0
                  ? delete errors.prepaidPrice
                  : errors.prepaidPrice
              }
              maxLength="9"
              addon="₽"
              hasValidation={data.prepaidPrice.length > 0 && true}
            />
            <VerticalDividerForm />
            <InputField
              label="Арендные каникулы:"
              name="rentalHolidays"
              value={data.rentalHolidays}
              placeholder="Введите кол-во дней:"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.rentalHolidays.length === 0
                  ? delete errors.rentalHolidays
                  : errors.rentalHolidays
              }
              maxLength="2"
              addon="◔"
              hasValidation={data.rentalHolidays.length > 0 && true}
            />
          </div>
          <HorizontalDividerForm />
          <div className="d-flex flex-column">
            <RadioField
              label="Готов сдавать помещение в аренду сейчас?"
              options={estateOptionsArray}
              value={data.readyToRent}
              name="readyToRent"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <RadioField
              label="Готов на наш Договор + протокол?"
              options={estateOptionsArray}
              value={data.readyToContract}
              name="readyToContract"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <RadioField
              label="Готов на ремонт?"
              options={estateOptionsArray}
              value={data.readyToRenovation}
              name="readyToRenovation"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <HorizontalDividerForm />
          <div className="d-flex">
            <InputField
              label="Площадь общая (м²):"
              name="totalSquare"
              value={makeSeparatorDigit(data.totalSquare)}
              placeholder="Введите общую площадь объекта"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.totalSquare.length === 0
                  ? delete errors.totalSquare
                  : errors.totalSquare
              }
              maxLength="4"
              addon="м²"
              hasValidation={data.totalSquare.length > 0 && true}
            />
            <VerticalDividerForm />
            <InputField
              label="Площадь по договору (м²):"
              name="rentSquare"
              value={makeSeparatorDigit(data.rentSquare)}
              placeholder="Введите выделенную площадь по АП"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.rentSquare.length === 0
                  ? delete errors.rentSquare
                  : errors.rentSquare
              }
              maxLength="4"
              addon="м²"
              hasValidation={data.rentSquare.length > 0 && true}
            />
          </div>
          <div className="d-flex">
            <InputField
              label="Высота потолков (м):"
              name="premisesHeight"
              value={data.premisesHeight}
              placeholder="Введите высоту потолков"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={
                data.premisesHeight.length === 0
                  ? delete errors.premisesHeight
                  : errors.premisesHeight
              }
              maxLength="4"
              addon="м"
              hasValidation={data.premisesHeight.length > 0 && true}
            />
            <VerticalDividerForm />
            <InputField
              label="Состояние пола:"
              name="premisesFloor"
              value={data.premisesFloor}
              placeholder="Материал пола"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength="35"
            />
          </div>
          <HorizontalDividerForm />
          <div className="d-flex flex-column justify-content-start">
            <SelectField
              label="Статус объекта:"
              name="status"
              onChange={handleChange}
              options={statusList}
              defaultOption="Выберите статус"
              error={errors.status}
              value={data.status}
              onKeyDown={handleKeyDown}
              hasValidation
            />
            <InputField
              label="Комментарий:"
              name="comment"
              placeholder="Введите комментарий"
              value={data.comment}
              maxLength="121"
              onChange={handleChange}
              error={errors.comment}
              onKeyDown={handleKeyDown}
              hasValidation
            />
            <TextArea
              label="Описание:"
              name="fullDescription"
              placeholder="Введите описание"
              value={data.fullDescription}
              onChange={handleChange}
              maxLength="2001"
              style={{ height: "150px" }}
              error={errors.fullDescription}
              onKeyDown={handleKeyDown}
              hasValidation
            />
          </div>
        </div>
        <CheckBox value={data.bookmark} onChange={handleChange} name="bookmark">
          Добавить в избранное
        </CheckBox>
        <div className="d-flex justify-content-between">
          <div>
            {!objectId ? (
              <CreateObjectButton
                disabled={!isValid}
                onClick={onClick}
                data={data}
                dataCity={
                  Object.keys(findedObject).length > 0 ? findLocality() : ""
                }
                dataAdress={findedObject.name}
                dataLatitude={
                  Object.keys(findedObject).length > 0
                    ? getLatitudeCoordinates()
                    : ""
                }
                dataLongitude={
                  Object.keys(findedObject).length > 0
                    ? getLongitudeCoordinates()
                    : ""
                }
              />
            ) : (
              <SaveObjectButton
                data={data}
                objectId={objectId}
                editObject={editObject}
                onEditObject={onEditObject}
              />
            )}
          </div>
          <div>
            <ClearFormButton onClearForm={handleClearForm} />
            <CloseFormButton onCloseForm={handleCloseForm} />
          </div>
        </div>
      </form>
    </>
  );
};

export default ObjectForm;
