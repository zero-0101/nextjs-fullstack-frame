import { type NextRequest } from "next/server";

import {
  createUser,
  CREATE_USER,
  QueryUsers,
} from "@/lib/actions/user.actions";
import { isAuthenticated } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const body: CREATE_USER = await request.json();

  const data = await createUser({
    nickname: body.nickname,
    email: body.email,
    image: body.image,
    password: body.password,
  });

  return new Response(JSON.stringify(data));
}

export async function GET(request: NextRequest) {
  const isAuth = isAuthenticated();
  if (isAuth) return isAuth;

  const searchParams = request.nextUrl.searchParams;

  const data = await QueryUsers({
    page: Number(searchParams.get("page")),
    perPage: Number(searchParams.get("perPage")),
    nickname: searchParams.get("nickname"),
  });

  return new Response(JSON.stringify(data));
}
