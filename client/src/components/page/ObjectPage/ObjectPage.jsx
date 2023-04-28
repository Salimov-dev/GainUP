import React from "react";
// Librares
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Components
import BackToElementsButton from "../../common/buttons/BackToElementsButton";
import RemoveElementButton from "../../common/buttons/RemoveElementButton";
import EditElementButton from "../../common/buttons/EditElementButton";
import ObjectOnMap from "../../common/ObjectOnMap/ObjectOnMap";
import ObjectDataList from "./ObjectDataList";
import Header from "../../common/Header";
// Store
import { getObjectById, removeObject } from "../../../store/objects.store";
import Navbar from "../../UI/navbar/Navbar";

const ObjectPage = () => {
  const objectId = useParams()
  const object = useSelector(getObjectById(objectId.objectId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveObject = () => {
    if (window.confirm("Удалить объект?")) {
      dispatch(removeObject(objectId.objectId));
      navigate("/objects");
      toast.success("Объект успешно удален!");
    }
  };

  // if (!object) {
  //   return <Navigate to="/" />;
  // }

  return (
<>
    <Navbar />
     <div className="container-fluid p-3">
        <Header title={`Карточка объекта:`} />
        <br />
        <div className="d-flex justify-content-between">
          <div>
            <BackToElementsButton navigateLink="-1" />
            <EditElementButton editElementLink={`/objects/${object._id}/edit`} />
          </div>
          <RemoveElementButton onRemoveElement={handleRemoveObject} />
        </div>
        <br />
        <ObjectDataList objectId={objectId.objectId} />
        <ObjectOnMap
          mapCenter={object.location}
          mapZoom={object.location.zoom}
          date={object.location.date}
          city={object.location.city}
          adress={object.location.adress}
          // status={status.name}
          comment={object.description.comment}
        />
      </div>
</>

     

  );
};

export default ObjectPage;
