import { http, HttpResponse } from 'msw';
import workspaceList from '../data/workspaceList.json';

import { BASE_URL, END_POINT } from '@/api';

export const workspaceHandler = [
  http.get(`${BASE_URL}${END_POINT.workspaceList}:id`, async () => {
    return HttpResponse.json(workspaceList, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.put(
    `${BASE_URL}${END_POINT.workspaceList}:id`,
    async ({ request, params }) => {
      const { id } = params;
      const data = (await request.json()) as {
        newSpaceName: string;
      };
      const { newSpaceName } = data;

      const updatedWorkspaceList = workspaceList.response.map((workspace) => {
        if (id && workspace.spaceId == Number(id)) {
          return { ...workspace, spaceName: newSpaceName };
        }
        return workspace;
      });
      workspaceList.response = updatedWorkspaceList;

      return HttpResponse.json(updatedWorkspaceList, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  ),

  http.delete(
    `${BASE_URL}${END_POINT.workspaceList}:id`,
    async ({ params }) => {
      const { id } = params;

      const updatedWorkspaceList = workspaceList.response.filter(
        (workspace) => workspace.spaceId != Number(id),
      );
      workspaceList.response = updatedWorkspaceList;

      return HttpResponse.json(updatedWorkspaceList, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  ),
];
