import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/utils/getUserIdFromRequest";
import { schemaImageUpdate } from "@/lib/validators";
import { getEnv } from '@/lib/env'

const env = await getEnv();

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const file = formData.get("file");

  const parsed = schemaImageUpdate.safeParse({ userId, file });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { file: validFile, userId: validUserId } = parsed.data;

  const arrayBuffer = await validFile.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "users",
          public_id: validUserId,
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const updatedUser = await prisma.user.update({
      where: { id: validUserId },
      data: {
        image: result.secure_url,
      },
    });

    return NextResponse.json(updatedUser.image);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro ao enviar imagem." }, { status: 500 });
  }
};
