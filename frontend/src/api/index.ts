import axios from 'axios';

export const BASE_URL = '/api';

export const END_POINT = {
  workspaceList: `/v1/spaces/`,
  folderList: `/v1/folders`,
};

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 3000,
});
