import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/utils/getUserIdFromRequest";
import { updateUserSchema } from "@/lib/validators/schema-user";


export async function PATCH(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const body = updateUserSchema.parse(json);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });


  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}