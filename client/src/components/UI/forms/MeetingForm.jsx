import React, { useEffect, useState } from "react";
// Librares
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// Utils
import { handleKeyDown } from "../../../utils/handleKeyDown";
import { validator } from "../../../utils/validator";
// Hooks
import useFindObject from "../../../hooks/useFindObject";
// Components
import ClearFormButton from "../../common/buttons/formButtons/ClearFormButton";
import CloseFormButton from "../../common/buttons/formButtons/CloseFormButton";
import FindObjectOnMap from "../../common/FindObjectOnMap/FindObjectOnMap";
import CreateMeetingButton from "./buttons/CreateMeetingButton";
import ObjectOnMap from "../../common/ObjectOnMap/ObjectOnMap";
import { InputField, SelectField } from "../../common/forms";
import SaveMeetingButton from "./buttons/SaveMeetingButton";
import {
  HorizontalDividerForm,
  VerticalDividerForm,
} from "../../common/dividers";
// Store
import { getDistrictsSpbLO } from "../../../store/districtsSpbLO.store";
import { getMeetingStatus } from "../../../store/meetingStatus.store";

const MeetingForm = ({
  onAddNewMeeting,
  meetingId,
  onEditMeeting,
  editMeeting,
}) => {
  const [data, setData] = useState({
    dateOfMeeting: editMeeting ? editMeeting.dateOfMeeting : "",
    timeOfMeeting: editMeeting ? editMeeting.timeOfMeeting : "",
    comment: editMeeting ? editMeeting.comment : "",
    meetingsStatus: editMeeting ? editMeeting.meetingsStatus : "",
    city: "",
    district: "",
  });
  const districtsSpbLO = useSelector(getDistrictsSpbLO());
  const [errors, setErrors] = useState({});
  const {
    findLocality,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();
  const meetingsStatus = useSelector(getMeetingStatus());
  const navigate = useNavigate();

  const meetingsStatusList = meetingsStatus?.map((status) => ({
    label: status.name,
    value: status._id,
  }));

  const districtsSpbLOList = districtsSpbLO?.map((dist) => ({
    label: dist.name,
    value: dist._id,
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
    district: {
      isRequired: {
        message: "Выберите район",
      },
    },
    dateOfMeeting: {
      isRequired: {
        message: "Выберите дату встречи",
      },
    },
    timeOfMeeting: {
      isRequired: {
        message: "Выберите время встречи",
      },
    },
    comment: {
      isRequired: {
        message: "Введите комментарий",
      },
    },
    // meetingsStatus: {
    //   isRequired: {
    //     message: "Выберите статус встречи",
    //   },
    // },
  };

  const handleCloseForm = () => {
    if (
      window.confirm("Внесенные изменения не сохраняться, закрыть страницу?")
    ) {
      handleClearForm();
      if (!meetingId) {
        toast.success("Создание встречи закрыто без изменений");
        return navigate(`/meetings`);
      }
      toast.success("Изменение встречи закрыто без изменений");
      navigate(`/meetings/${meetingId}`);
    }
  };

  const handleSubmit = async (e) => {
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
    }
    setData(copyData);
  };

  useEffect(() => {
    validate();
  }, [data, findedObject]);

  for (const key in data) {
    if (data[key] !== "Неизвестно" && data[key].length > 0) {
      window.onbeforeunload = () => {
        return "Уверены, что хотите закрыть страницу?";
      };
      window.onpopstate = () => {
        if (editMeeting) {
          if (
            window.confirm(
              "Внесенные изменения не сохраняться, закрыть изменение встречи?"
            )
          ) {
            toast.success("Изменение встречи закрыто без изменений");
            return navigate(`/meetings/${meetingId}`);
          }
          return navigate(`/meetings/${meetingId}/edit`);
        }
        if (
          window.confirm(
            "Внесенные изменения не сохраняться, закрыть создание встречи?"
          )
        ) {
          toast.success("Создание встречи закрыто без изменений");
          return navigate(`/meetings`);
        }
        return navigate("/meetings/addNewMeeting");
      };
    }
  }
  return (
    <div style={{ width: "900px" }}>
      {!editMeeting ? (
        <FindObjectOnMap />
      ) : (
        <div style={{ width: "900px" }} className="mb-3">
          <ObjectOnMap
            mapCenter={editMeeting.location}
            mapZoom={editMeeting.location.zoom}
            date={editMeeting.date}
            city={editMeeting.location.city}
            adress={editMeeting.location.adress}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {!editMeeting ? (
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
            label="Дата встречи:"
            type="date"
            name="dateOfMeeting"
            onChange={handleChange}
            value={data.dateOfMeeting}
            error={errors.dateOfMeeting}
            onKeyDown={handleKeyDown}
            hasValidation
          />
          <VerticalDividerForm />
          <InputField
            label="Время встречи:"
            type="time"
            name="timeOfMeeting"
            onChange={handleChange}
            value={data.timeOfMeeting}
            error={errors.timeOfMeeting}
            onKeyDown={handleKeyDown}
            hasValidation
          />
        </div>
        <div className="d-flex">
          <InputField
            label="Комментарий:"
            name="comment"
            placeholder="Введите комментарий"
            value={data.comment}
            maxLength="81"
            onChange={handleChange}
            error={errors.comment}
            onKeyDown={handleKeyDown}
            hasValidation
          />

          {editMeeting && (
            <>
              <VerticalDividerForm />
              <SelectField
                label="Действующий статус встречи:"
                onChange={handleChange}
                name="meetingsStatus"
                options={meetingsStatusList}
                defaultOption="Выберите статус встречи"
                value={data.meetingsStatus}
                error={errors.meetingsStatus}
                onKeyDown={handleKeyDown}
                hasValidation
              />
            </>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <div>
            {!editMeeting ? (
              <CreateMeetingButton
                disabled={!isValid}
                onAddNewMeeting={onAddNewMeeting}
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
              <SaveMeetingButton
                meetingId={meetingId}
                onEditMeeting={onEditMeeting}
                data={data}
                editMeeting={editMeeting}
              />
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

export default MeetingForm;
