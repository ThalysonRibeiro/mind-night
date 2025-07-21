"use client"

import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Camera, User } from "lucide-react";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import Image from "next/image";
import api from "@/lib/axios";

export function AvatarProfile({ avatarUrl, }: { avatarUrl: string; }) {
  const [previewImage, setPreviewImage] = useState<string | null>(avatarUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useSession();

  const handleImageChage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const image = e.target.files[0];

      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(image.type)) {
        toast.error('Tipo de arquivo não suportado');
        setLoading(false);
        return;
      }

      if (!image) {
        toast.error("Falha ao alterar imagem");
        return;
      }
      const urlImage = await uploadImage(image);
      setPreviewImage(urlImage);
      await update({
        image: urlImage,
      });
      setLoading(false);
    }
  }

  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const response = await api.post('/api/user/image/upload', formData);
      console.log(response.data);

      if (!response.data) {
        toast.error('Erro ao fazer upload da imagem');
        return null;
      }
      toast.success("Imagem alterada com sucesso!");
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error('Erro ao fazer upload da imagem');
    }
  }

  return (
    <div className="relative w-40 h-40">
      <div className="relative flex  items-center justify-center  w-full h-full">
        {<span className="absolute bottom-0 right-3 cursor-pointer z-[2] p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors rounded-full shadow-xl">
          {loading
            ? <Spinner className="text-black" size={20} variant='infinite' />
            : <Camera className="w-4 h-4 text-black" />}
        </span>}
        <input
          type="file"
          id="file-upload"
          name="file-upload"
          accept=".png,.jpg,.jpeg,.webp"
          className="opacity-0 cursor-pointer relative z-50 w-48 h-48"
          onChange={handleImageChage}
        />
      </div>

      {previewImage ? (
        <div className="absolute top-0 left-0 overflow-hidden w-40 h-40 object-cover rounded-full bg-slate-200">
          <Image
            src={previewImage}
            alt="imagem de perfil"
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
          />
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
      )}

    </div>
  )
}