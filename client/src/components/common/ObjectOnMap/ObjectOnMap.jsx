/* eslint-disable no-undef */
import React from "react";
// Librares
import { useEffect } from "react";
import dayjs from "dayjs";
// Styles
import "./styles.css";
// Icons
import target from "../../../img/location/target.png";

const ObjectOnMap = ({
  mapCenter,
  mapZoom,
  date,
  city,
  adress,
  status,
  comment,
}) => {
  const center = [mapCenter.latitude, mapCenter.longitude];
  const zoom = mapZoom;

  function showObjOnMap() {
    const mapObjOnPage = new ymaps.Map("map-obj", {
      center: center,
      zoom: zoom,
    });
    const placeMark = new ymaps.Placemark(
      center,
      {
        hintContent: `${city}: ${adress}`,
        balloonContent: `
            <div>
                <div><strong>Дата добавления:</strong> ${dayjs(date).format(
                  "DD.MM.YYYY"
                )}</div>
                <div><strong>Город:</strong> ${city}</div>
                <div><strong>Адрес:</strong> ${adress}</div>
                <div><strong>Статус:</strong> ${status}</div>
                <div><strong>Комментарий:</strong> ${comment}</div>
            </div>
        `,
      },
      {
        iconLayout: "default#image",
        iconImageHref: target,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      }
    );

    mapObjOnPage.geoObjects.add(placeMark);
  }

  useEffect(() => {
    ymaps.ready(showObjOnMap);
  }, []);

  return (
    <div
      id="map-obj"
      className="container-fluid p-0 mapObject__container"
    ></div>
  );
};

export default ObjectOnMap;
