import httpService from "./http.service";

const districtsSpbLOEndpoint = "/districtSpbLo";

const districtsSpbLOService = {
  get: async () => {
    const { data } = await httpService.get(districtsSpbLOEndpoint);
    return data;
  },
};
export default districtsSpbLOService;
