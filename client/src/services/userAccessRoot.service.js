import httpService from "./http.service";

const userAccessRootEndpoint = "userAccessRoot/";

const userAccessRootService = {
  get: async () => {
    const { data } = await httpService.get(userAccessRootEndpoint);
    return data;
  },
};
export default userAccessRootService;
