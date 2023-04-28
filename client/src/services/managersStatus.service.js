import httpService from "./http.service";

const managersStatusEndpoint = "/managerStatus";

const managersStatusService = {
  get: async () => {
    const { data } = await httpService.get(managersStatusEndpoint);
    return data;
  },
};
export default managersStatusService;
