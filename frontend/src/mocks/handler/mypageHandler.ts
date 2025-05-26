import { http, HttpResponse } from "msw";
import mypageInfo from '../data/mypage.json'

export const mypageHandler = [
  http.get('/api/v1/user/info', async ({ request }) => {
    const url = new URL(request.url)
    const year = url.searchParams.get('year')
    const month = url.searchParams.get('month')

    return HttpResponse.json(mypageInfo, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  })
]