import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export async function getUserIdFromRequest(req: NextRequest): Promise<string | null> {
  const authorization = req.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.MY_APP_JWT_SECRET!) as JwtPayload;
      return decoded.id;
    } catch {
      return null;
    }
  }

  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
}
