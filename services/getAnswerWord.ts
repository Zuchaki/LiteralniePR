import axios from 'axios';
import { array, number, object, string } from 'yup';

import { apiRoutes } from './config';

const AnswerWordSchema = array()
  .of(
    object({
      created_at: string().defined(),
      data: string().defined(),
      id: number().required(),
      published_at: string().defined(),
      slowo: string().defined(),
      updated_at: string().defined(),
    }),
  )
  .required();

export const getAnswerWord = async () => {
  const { data } = await axios.get(apiRoutes.literalnies._root, {
    params: { _limit: 1, _sort: 'created_at:DESC' },
  });
  return AnswerWordSchema.validate(data);
};
