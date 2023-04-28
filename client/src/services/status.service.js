import httpService from "./http.service";

const statusEndpoint = "/objectStatus";

const statusService = {
  get: async () => {
    const { data } = await httpService.get(statusEndpoint);
    return data;
  },
};
export default statusService;
