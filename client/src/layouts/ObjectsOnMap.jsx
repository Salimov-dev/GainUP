/* eslint-disable no-undef */
import React, { useEffect } from "react";
// Librares
import dayjs from "dayjs";
import { useSelector } from "react-redux";
// Components
import Navbar from "../components/UI/navbar/Navbar";
import Header from "../components/common/Header";
// Icons
import target_cluster from "../img/location/target_cluster.png";
import target from "../img/location/target.png";
// Store
import { getStatusObject } from "../store/statusObject.store";
import { getObjectsList } from "../store/objects.store";

const ObjectsOnMap = () => {
  const allObjects = useSelector(getObjectsList());
  const status = useSelector(getStatusObject());
  let geoObjects = [];

  function getStatus(id) {
    return status.find((s) => s._id === id);
  }

  function showAllObjects() {
    const mapAllObjects = new ymaps.Map("map__objects", {
      center: [59.930320630519155, 30.32906024941998],
      zoom: 11,
    });

    for (let i = 0; i < allObjects.length; i++) {
      const id = allObjects[i].status;

      geoObjects[i] = new ymaps.Placemark(
        [allObjects[i].location.latitude, allObjects[i].location.longitude],
        {
          hintContent: [
            allObjects[i].location.city,
            allObjects[i].location.adress,
          ],
          clusterCaption: `${dayjs(allObjects[i].date).format("DD.MM.YYYY")}`,
          balloonContent: `
            <div>
                <div ><strong>Дата добавления:</strong> ${dayjs(
                  allObjects[i].date
                ).format("DD.MM.YYYY")}</div>
                <div><strong>Город:</strong> ${
                  allObjects[i].location.city
                }</div>
                <div><strong>Адрес:</strong> ${
                  allObjects[i].location.adress
                }</div>
                <div><strong>Статус:</strong> ${
                  getStatus(allObjects[i].status).name
                }</div>
                <div><strong>Комментарий:</strong> ${
                  allObjects[i].description.comment
                }</div>
                <hr/>
                <div><a class="btn btn-warning btn-sm" href=/objects/${
                  allObjects[i]._id
                }>Перейти в объект</a></div>
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
    }
    const clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: target_cluster,
          size: [50, 50],
          offset: [-25, -25],
        },
      ],
    });
    mapAllObjects.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }

  useEffect(() => {
    ymaps.ready(showAllObjects);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid overflow-hidden p-3">
        <Header title={"Все объекты на карте"} />
        <div
          id="map__objects"
          style={{
            width: "100%",
            height: "80%",
            autoFitToViewport: "always",
          }}
        ></div>
      </div>
    </>
  );
};

export default ObjectsOnMap;
