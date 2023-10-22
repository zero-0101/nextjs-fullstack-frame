import { NextRequest } from "next/server";
import { DeleteUser } from "@/lib/actions/user.actions";
import { isAuthenticated } from "@/lib/jwt";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuth = isAuthenticated();
  if (isAuth) return isAuth;

  const data = await DeleteUser(params.id);

  return new Response(JSON.stringify(data));
}
