import axios from "axios";
import { apiRoutes } from "./config";

type GetWords = {
  id: number;
  slowo: string;
  data: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}[];
export const getWords = async (word?: string): Promise<GetWords> => {
  const { data } = await axios.get(apiRoutes.literalnies._root, {
    params: { _limit: 1, _sort: "created_at:DESC", slowo: word },
  });
  return data;
};
