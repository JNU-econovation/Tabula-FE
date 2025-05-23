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

  http.post(`${BASE_URL}${END_POINT.workspaceList}:id`, async ({ request }) => {
    const formData = await request.formData();

    return HttpResponse.json(
      { message: 'File uploaded successfully' },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),

  http.get('/sse/ai-progress/:id', ({ params }) => {
    const encoder = new TextEncoder();
    let progress = 10;

    const stream = new ReadableStream({
      start(controller) {
        const interval = setInterval(() => {
          progress += 10;

          if (progress >= 100) {
            const completeResponse = {
              success: true,
              response: {
                spaceId: Math.random(),
                spaceName: '운영체제를 딥하게 배우기',
                keywords: [
                  { id: 1, keyword: '운영체제란?' },
                  { id: 2, keyword: '멀티 프로세싱' },
                  { id: 3, keyword: '멀티 쓰레딩' },
                ],
              },
              error: null,
            };
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(completeResponse)}\n\n`),
            );
            controller.close();
            clearInterval(interval);
          } else {
            controller.enqueue(encoder.encode(`data: ${progress}\n\n`));
          }
        }, 500);
      },
    });

    workspaceList.response = [
      ...workspaceList.response,
      {
        spaceId: 1,
        spaceName: '운영체제를 딥하게 배우기',
      },
    ];

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }),
];
