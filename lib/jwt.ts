import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function isAuthenticated() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const secret_key = process.env.SECRET_KEY;
    jwt.verify(token!, secret_key!);
    return;
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "authentication failed", status: 401 },
      { status: 401 }
    );
  }
}
