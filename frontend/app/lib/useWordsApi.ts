import { Pageable } from "../types/pageable";
import { Word, WordSearchDto } from "../types/words";
import useAxiosAuth from "./useAxiosAuth";

const useWordsApi = () => {
  const axiosAuth = useAxiosAuth();

  const wordsApiUrl = "/word";
  const findById = async (id: number): Promise<Word> => {
    return await axiosAuth
      .get(`${wordsApiUrl}/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };

  const findAll = async (): Promise<Word[]> => {
    return await axiosAuth
      .get(`${wordsApiUrl}/all`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };

  const findAllPageable = async (
    page: number,
    pageSize: number,
    sort: string | undefined
  ): Promise<Pageable<Word>> => {
    return await axiosAuth
      .get(
        `${wordsApiUrl}/?page=${page}&size=${pageSize}` +
          (sort ? `&sort=${sort}` : "")
      )
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };

  
  const search = async (
    dto: WordSearchDto,
    page: number,
    pageSize: number,
    sort: string | undefined
  ): Promise<Pageable<Word>> => {
    return await axiosAuth
      .post(
        `${wordsApiUrl}/search?page=${page}&size=${pageSize}` +
          (sort ? `&sort=${sort}` : ""),
        dto
      )
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
  };


  return {
    wordsApiUrl,
    findById,
    findAll,
    search,
  };
};

export default useWordsApi;