import React from "react";
// Librares
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// Utils
import { makeSeparatorDigit } from "../../../utils/makeSeparatorDigit";
import { phoneFormat } from "../../../utils/phoneFormat";
// Store
import { getgetDistrictsSpbLOById } from "../../../store/districtsSpbLO.store";
import { getWorkingPositionById } from "../../../store/workingPosition.store";
import { getStatusObjectById } from "../../../store/statusObject.store";
import { getObjectById } from "../../../store/objects.store";

const ObjectDataList = ({ objectId }) => {
  const object = useSelector(getObjectById(objectId));
  const workingPosition = useSelector(
    getWorkingPositionById(object.contact.position)
  );
  const status = useSelector(getStatusObjectById(object.status));
  const district = useSelector(
    getgetDistrictsSpbLOById(object.location.district)
  );
  
  return (
    <div className="d-flex flex-column">
      <div className="d-flex ">
        <div className="me-4">
          <ul className="p-0">
            <li>
              <strong>Уникальный ID объекта: </strong>
              {`${object._id}`}
            </li>
            <li>
              <strong>Дата добавления: </strong>
              {`${dayjs(object.created_at).format("DD.MM.YYYY")}`}
            </li>
            <li>
              <strong>Дата посл.изменений: </strong>
              {`${
                object.edited_at
                  ? dayjs(object.edited_at).format("DD.MM.YYYY")
                  : "Изменений не было"
              }`}
            </li>
            <li>
              <strong>Статус: </strong>
              {`${status}`}
            </li>
            <li>
              <strong>Город: </strong>
              {`${object.location.city}`}
            </li>
            <li>
              <strong>Адрес: </strong>
              {`${object.location.adress}`}
            </li>
            <li>
              <strong>Район: </strong>
              {`${district?.name}`}
            </li>
            <br />
          </ul>
        </div>

        <div className="me-4">
          <ul className="p-0">
            <li>
              <strong>АП, при которой готов сдать: </strong>
           
              {object.estateOptions.rentPrice ? `${makeSeparatorDigit(object.estateOptions.rentPrice)}руб` : "Неизвестно"}
            </li>
            <li>
              <strong>Авансовый платёж: </strong>
              {object.estateOptions.prepaidPrice ? `${makeSeparatorDigit(object.estateOptions.prepaidPrice)}руб` : "Неизвестно"}
            </li>
            <li>
              <strong>Арендные каникулы: </strong>
              {object.estateOptions.rentalHolidays ? `${object.estateOptions.rentalHolidays} дней` : "Неизвестно"}
            </li>
            <li>
              <strong>Площадь общая: </strong>
              {object.estateOptions.totalSquare ? `${makeSeparatorDigit(object.estateOptions.totalSquare)}м²` : "Неизвестно"}
            </li>
            <li>
              <strong>Площадь по договору: </strong>
              {object.estateOptions.rentSquare ? `${makeSeparatorDigit(object.estateOptions.rentSquare)}м²` : "Неизвестно"}
            </li>
            <li>
              <strong>Высота потолков: </strong>
              {object.estateOptions.premisesHeight ? `${object.estateOptions.premisesHeight}м` : "Неизвестно"}
            </li>
            <li>
              <strong>Состояние пола: </strong>
              {object.estateOptions.premisesFloor ? `${object.estateOptions.premisesFloor}` : "Неизвестно"}
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <strong>Имя контакта: </strong>
              {object.contact.name ? `${object.contact.name}` : "Неизвестно"}
            </li>
            <li>
              <strong>Должность: </strong>
              {`${workingPosition?.name}`}
            </li>
            <li>
              <strong>Телефон: </strong>
              {object.contact.phone ? `${phoneFormat(object.contact.phone)}` : "Неизвестно"}
            </li>
            <li>
              <strong>E-mail: </strong>
              {object.contact.email ? `${object.contact.email}` : "Неизвестно"}
            </li>
            <li>
              <strong>Готов сдавать помещение в аренду сейчас: </strong>
              {`${object.accordTerms.readyToRent}`}
            </li>
            <li>
              <strong>Готов на наш Договор и протокол: </strong>
              {`${object.accordTerms.readyToContract}`}
            </li>
            <li>
              <strong>Готов на ремонт: </strong>
              {`${object.accordTerms.readyToRenovation}`}
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-start p-0">
        <ul className="p-0">
          <li>
            <strong>Комментарий: </strong>
            {`${object.description.comment}`}
          </li>
          <li>
            <strong>Полное описание: </strong>
            {`${object.description.fullDescription}`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ObjectDataList;
