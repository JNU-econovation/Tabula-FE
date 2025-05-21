import { http, HttpResponse } from 'msw';

import workspaceList from './data/workspaceList.json';
import folderList from './data/folderList.json';
import { BASE_URL, END_POINT } from '@/api';
import { PostFolderProps } from '@/hooks/query/usePostFolder';

export const handlers = [
  http.get(`${BASE_URL}${END_POINT.workspaceList}:id`, async () => {
    return HttpResponse.json(workspaceList, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/api/v1/folders', async () => {
    return HttpResponse.json(folderList.response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
  http.post('/api/v1/folders', async ({ request }) => {
    const data = (await request.json()) as PostFolderProps;
    const { folderName, colorIndex } = data;
    
    const newFolder = {
      folderName,
      colorIndex,
    };

    return HttpResponse.json(newFolder, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
  http.delete(`/api/v1/folders/:folderId`, async({ params }) => {
    const { folderId } = params

    return HttpResponse.json(
      { message: `${folderId} 폴더가 삭제되었습니다.`},
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }),
  http.put(`/api/v1/folders/:folderId`, async ({ params }) => {
    const { folderId } = params

    if (!folderId) {
      return HttpResponse.json(
        { error: "폴더 ID가 없습니다." },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    return HttpResponse.json({
      success: true,
      response: null,
      error: null
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
];
