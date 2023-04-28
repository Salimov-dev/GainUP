import { useEffect, useState } from "react";
import objects from "../mockData/objects.json";
import status from "../mockData/status.json";
import workingPosition from "../mockData/workingPosition.json";
import districtsSpbLO from "../mockData/districtsSpbLO.json";
import districtsLO from "../mockData/districtsLO.json";
import districtsSPB from "../mockData/districtsSPB.json";
import managersStatus from "../mockData/managersStatus.json";
import userAccessRoot from "../mockData/userAccessRoot.json";
import meetingsStatus from "../mockData/meetingsStatus.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConst = {
    idle: "Not started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occured",
  };
  const [error, setError] = useState(null);
  const [statusData, setStatusData] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summuryCount =
    objects.length +
    workingPosition.length +
    status.length +
    districtsSpbLO.length +
    // districtsLO.length +
    // districtsSPB.length +
    meetingsStatus.length +
    userAccessRoot.length +
    managersStatus.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && statusData === statusConst.idle) {
      setStatusData(statusConst.pending);
    }
    const newProgress = Math.floor((count / summuryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatusData(statusConst.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const stat of status) {
        await httpService.put("status/" + stat.id, stat);
        incrementCount();
      }
      for (const obj of objects) {
        await httpService.put("object/" + obj.id, obj);
        incrementCount();
      }
      for (const pos of workingPosition) {
        await httpService.put("workingPosition/" + pos.id, pos);
        incrementCount();
      }
      for (const dist of districtsSpbLO) {
        await httpService.put("districtsSpbLO/" + dist.id, dist);
        incrementCount();
      }
      // for (const distLO of districtsLO) {
      //   await httpService.put("districtsLO/" + distLO.name, distLO);
      //   incrementCount();
      // }
      // for (const distSPB of districtsSPB) {
      //   await httpService.put("districtsSPB/" + distSPB.name, distSPB);
      //   incrementCount();
      // }
      for (const menegerStatus of managersStatus) {
        await httpService.put(
          "managersStatus/" + menegerStatus.id,
          menegerStatus
        );
        incrementCount();
      }
      for (const meetingStatus of meetingsStatus) {
        await httpService.put(
          "meetingsStatus/" + meetingStatus.id,
          meetingStatus
        );
        incrementCount();
      }
      for (const root of userAccessRoot) {
        await httpService.put("userAccessRoot/" + root.id, root);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatusData(statusConst.error);
    }
  }
  return { error, initialize, progress, statusData };
};

export default useMockData;
