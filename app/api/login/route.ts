import { QueryUser } from "@/lib/actions/user.actions";
import { signJwtAccessToken } from "@/lib/jwt";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const data = await QueryUser({
    email: body.email,
    password: body.password,
  });

  const token = signJwtAccessToken(data.data ?? {});

  const res = new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Set-Cookie": `token=${token}` },
  });

  return res;
}
