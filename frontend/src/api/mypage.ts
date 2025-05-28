import { AxiosInstance, END_POINT } from '.';

export interface StatsData {
  date: string;
  cnt: number;
}

interface UserInfoResponse {
  success: boolean;
  response: {
    userName: string;
    data: StatsData[];
  };
  error: any;
}

export const getMypage = async (
  year: number,
  month: number,
): Promise<UserInfoResponse> => {
  const response = await AxiosInstance.get(
    `${END_POINT.mypage}?year=${year}&month=${month}`,
  );
  return response.data;
};
