import { http, HttpResponse } from 'msw';

import workspaceList from './data/workspaceList.json';
import { BASE_URL, END_POINT } from '@/api';

export const handlers = [
  http.get(`${BASE_URL}${END_POINT.workspaceList}:id`, async () => {
    return HttpResponse.json(workspaceList, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
