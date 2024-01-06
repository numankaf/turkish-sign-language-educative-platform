import { UserDetailDto, UserListDto } from "@/app/types/users";
import useAxiosAuth from "./useAxiosAuth";

const useUsersApi = () => {
  const axiosAuth = useAxiosAuth();

  const usersApiUrl = "/user";
  const getById = async (id: number): Promise<UserDetailDto> => {
    return await axiosAuth
      .get(`${usersApiUrl}/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };

  const getUsers = async (): Promise<UserListDto[]> => {
    return await axiosAuth
      .get(`${usersApiUrl}/all`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };

  return {
    usersApiUrl,
    getUsers,
    getById,
  };
};

export default useUsersApi;
