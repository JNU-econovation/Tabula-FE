import { http, HttpResponse } from 'msw';
import workspaceList from '../data/workspaceList.json';
import learningResultList from '../data/learningResultList.json';

import { BASE_URL, END_POINT } from '@/api';

export const workspaceHandler = [
  http.get(`${BASE_URL}${END_POINT.workspaceList}:id/lists`, async () => {
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
    const createdWorkspace = {
      task_id: '12345',
    };

    return HttpResponse.json(createdWorkspace, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get(`${BASE_URL}${END_POINT.workspaceList}:id`, async () => {
    return HttpResponse.json(learningResultList, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.post(
    `${BASE_URL}${END_POINT.workspaceList}:spaceId/result`,
    async ({ request, params }) => {
      const createdLearningResult = {
        success: true,
        response: {
          taskId: '12413121',
          fileName: `learning-result.zip`,
        },
        error: null,
      };
      return HttpResponse.json(createdLearningResult, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  ),

  http.get(
    `${BASE_URL}${END_POINT.workspaceList}:folderId/progress/:task_id`,
    () => {
      const encoder = new TextEncoder();
      let progress = 0;

      const stream = new ReadableStream({
        start(controller) {
          const interval = setInterval(() => {
            progress += 30;

            if (progress >= 100) {
              const completeResponse = {
                success: true,
                status: 'complete',
                progress: 100,
                response: {
                  resultId: 12020,
                  resultFileName: 'os',
                  results: [
                    // results의 id는 이미지 순서 의미
                    {
                      id: 1111,
                      resultImageUrl: 'https://picsum.photos/200/300?random=5',
                    },
                    {
                      id: 2222,
                      resultImageUrl: 'https://picsum.photos/200/300?random=5',
                    },
                  ],
                },
                error: null,
              };
              // TODO: 로딩 SSE API URI가 같고, return 하는 데이터 형태만 달라서 주석 처리
              // {
              //   success: true,
              //   response: {
              //     progress: 100,
              //     status: 'complete',
              //     spaceId: 1000,
              //     spaceName: '운영체제를 딥하게 배우기',
              //     keywords: [
              //       { id: 1, keyword: '운영체제란?' },
              //       { id: 2, keyword: '멀티 프로세싱' },
              //       { id: 3, keyword: '멀티 쓰레딩' },
              //     ],
              //   },
              //   error: null,
              // };
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(completeResponse)}\n\n`),
              );
              controller.close();
              clearInterval(interval);
            } else {
              const progressResponse = {
                success: true,
                response: {
                  progress,
                  status: 'processing',
                },
                error: null,
              };
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(progressResponse)}\n\n`),
              );
            }
          }, 500);
        },
      });

      // workspaceList.response = [
      //   ...workspaceList.response,
      //   {
      //     spaceId: 1,
      //     spaceName: '운영체제를 딥하게 배우기',
      //   },
      // ];

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    },
  ),
];
