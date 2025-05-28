import { BASE_URL, END_POINT } from "@/api";
import { http, HttpResponse } from "msw";
import guestLogin from '../data/guestLogin.json'

export const loginHandler = [
  http.post(`${BASE_URL}${END_POINT.guestLogin}`, async () => {
    return HttpResponse.json(guestLogin, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
]