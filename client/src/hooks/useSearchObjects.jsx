import dayjs from "dayjs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getObjectsList } from "../store/objects.store";

const useSearchObjects = (searchQuery) => {
  const objects = useSelector(getObjectsList());

  const searchedObjects = useMemo(() => {
    let searchQueryArray = [];

      searchQueryArray = [...objects];

    if (searchQuery.adress.length > 0) {
      searchQueryArray = searchQueryArray.filter((obj) =>
        obj.location.adress
          .toLowerCase()
          .includes(searchQuery.adress.toLowerCase())
      );
    }

    if (searchQuery.city.length > 0) {
      const searchQueryCity = [];
      searchQuery.city.map((city) => searchQueryCity.push(city.label));
      searchQueryArray = searchQueryArray.filter((obj) =>
        searchQueryCity.includes(obj.location.city)
      );
    }
    if (searchQuery.district.length > 0) {
      const searchQueryDistricts = [];
      searchQuery.district.map((dist) => searchQueryDistricts.push(dist.value));
      searchQueryArray = searchQueryArray.filter((obj) =>
        searchQueryDistricts.includes(obj.location.district)
      );
    }
    if (searchQuery.name.length > 0) {
      searchQueryArray = searchQueryArray.filter((obj) =>
        obj.contact.name.toLowerCase().includes(searchQuery.name.toLowerCase())
      );
    }
    if (searchQuery.phone.length > 0) {
      searchQueryArray = searchQueryArray.filter((obj) =>
        obj.contact.phone
          .toLowerCase()
          .includes(searchQuery.phone.toLowerCase())
      );
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const dayStart = dayjs(searchQuery.dateStart).valueOf();
    const dayEnd = dayjs(searchQuery.dateEnd).valueOf() + oneDay;
    if (searchQuery.dateEnd.length > 0) {
      searchQueryArray = searchQueryArray?.filter(
        (obj) =>
          obj.created_at >= dayjs(1318781876406) && obj.created_at <= dayEnd
      );
    }
    if (searchQuery.dateStart.length > 0) {
      searchQueryArray = searchQueryArray?.filter(
        (obj) =>
          obj.created_at >= dayStart && obj.created_at <= dayjs() + oneDay
      );
    }
    if (searchQuery.dateStart.length > 0 && searchQuery.dateEnd.length > 0) {
      searchQueryArray = searchQueryArray?.filter(
        (obj) => obj.created_at >= dayStart && obj.created_at <= dayEnd
      );
    }
    
    return searchQueryArray;
  }, [searchQuery, objects]);
  return { searchedObjects };
};

export default useSearchObjects;
