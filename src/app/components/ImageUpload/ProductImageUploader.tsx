"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import Image from "next/image";
import BeatLoader from "react-spinners/BeatLoader";
import { useQueryClient } from "@tanstack/react-query";
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useI18n } from "@/app/locales/client";
import UploadIcon from "../svg/UploadIcon";

interface ImageUploadPageProps {
  onUploadComplete: (url: string) => void;
}

export default function ProductImageUpload({
  onUploadComplete,
}: ImageUploadPageProps) {
  const client = useQueryClient();
  const [modal, setModal] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const t = useI18n();

  const handleUpload = async () => {
    setModal(true);

    try {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(
        `${URL}/api/avatar/upload?filename=${file.name}`,
        {
          method: "POST",
          body: file,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      onUploadComplete(newBlob.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setModal(false);
    }
  };

  const handleClickLabel = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleInputChange = () => {
    handleUpload();
  };

  return (
    <section className="flex flex-col gap-4">
      {blob && (
        <div className="">
          <Image
            src={blob.url}
            width={200}
            height={200}
            alt="Uploaded image"
            className="w-[200px] h-[200px]"
          />
        </div>
      )}
      <form className="flex w-3/5 gap-6 justify-start ">
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleInputChange}
          required
          id="imageupload"
        />

        <span
          className="flex items-center gap-3 border border-green-500 p-6 border-dashed cursor-pointer"
          onClick={handleClickLabel}
        >
          <UploadIcon />
          <label htmlFor="imageupload" className="file-upload-label">
            {t("chooseImage")}
          </label>
        </span>
      </form>

      {modal && <BeatLoader />}
    </section>
  );
}
