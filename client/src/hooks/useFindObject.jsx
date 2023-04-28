import { useEffect, useState } from "react";

const useFindObject = () => {
  // ==== НАЙТИ ОБЪЕКТ НА КАРТЕ ==== //
  /* eslint-disable no-undef */
  /* eslint-disable no-unused-vars */
  const [findedObject, setFindedObject] = useState({});
  function init() {
    var myPlacemark,
      myMap = new ymaps.Map(
        "findObject",
        {
          center: [59.927702320754996, 30.337777413480463],
          zoom: 12,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      var coords = e.get("coords");

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add("dragend", function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "поиск...",
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true,
        }
      );
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
      myPlacemark.properties.set("iconCaption", "поиск...");
      ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties.set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine(),
        });
        setFindedObject(firstGeoObject.properties.getAll());
      });
    }
  }
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  const findLocality = () => {
    let objectToFind =
      findedObject.metaDataProperty.GeocoderMetaData.Address.Components;
    const localityObject = objectToFind.filter((item) => {
      if (item.kind === "locality") return item.name;
    });
    return localityObject[0].name;
  };
  
  const getLatitudeCoordinates = () => {
    return (findedObject.boundedBy[0][0] + findedObject.boundedBy[1][0]) / 2;
  };

  const getLongitudeCoordinates = () => {
    return (findedObject.boundedBy[0][1] + findedObject.boundedBy[1][1]) / 2;
  };

  return {
    findLocality,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  };
};

export default useFindObject;
