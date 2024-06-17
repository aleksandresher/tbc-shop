"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import Image from "next/image";
import BeatLoader from "react-spinners/BeatLoader";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ImageUploadPageProps {
  onUploadComplete: (url: string) => void;
}

export default function ImageUploadPage({
  onUploadComplete,
}: ImageUploadPageProps) {
  const [modal, setModal] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleUpload = async () => {
    setModal(true);
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

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
    onUploadComplete(newBlob.url);
    setModal(false);
  };

  return (
    <>
      <h1>Upload Product Image</h1>
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
