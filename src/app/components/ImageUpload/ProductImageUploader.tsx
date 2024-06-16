"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import Image from "next/image";
import BeatLoader from "react-spinners/BeatLoader";
import { useQueryClient } from "@tanstack/react-query";

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

  const handleUpload = async () => {
    setModal(true);
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);

    onUploadComplete(newBlob.url);

    setModal(false);
  };

  return (
    <>
      <form>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
      {modal && <BeatLoader />}
      {blob && (
        <div>
          <Image src={blob.url} width={100} height={100} alt="Uploaded image" />
        </div>
      )}
    </>
  );
}
