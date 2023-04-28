import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "/managers";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload.id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  remove: async (userId) => {
    const { data } = await httpService.delete(userEndpoint + "/" + userId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default userService;
