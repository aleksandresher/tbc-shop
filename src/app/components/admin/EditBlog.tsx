import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import ProductImageUpload from "../ImageUpload/ProductImageUploader";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface BlogData {
  title: string;
  image: string;
  author: string;
  content: string;
}

const EditBlog = ({ content }: { content: BlogData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogData>({ defaultValues: content });
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(
    content.image
  );
  const queryClient = useQueryClient();

  const onSubmit = async (data: BlogData) => {
    try {
      const response = await fetch(`${URL}/api/blog/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit blog");
      }

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({ description: "Blog edited successfully!" });
      setOpen(false);
    } catch (error) {
      console.error("Error editing blog:", error);
      toast({ description: "Error deleting blog", variant: "destructive" });
    }
  };

  const handleImageUpload = (url: string) => {
    setProductImageUrl(url);
    setValue("image", url);
  };

  return (
    <section className="flex items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex justify-center items-center border-2 rounded-[8px] border-outset border-opacity-50 border-[#f1a45d] p-2 cursor-pointer w-[150px] h-[40px] bg-[#90e28d]">
            <Image
              src="/editbtn.svg"
              width={30}
              height={30}
              alt="edit button"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-screen h-screen overflow-y-auto bg-gray-300 overflow-x-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col p-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="w-full flex items-center justify-between gap-2">
                  <label htmlFor="title">Title</label>
                  <input
                    className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                </div>
                {errors.title && (
                  <p className="text-red-600">{errors.title.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full flex items-center justify-between gap-2">
                  <label htmlFor="content">Content</label>
                  <textarea
                    className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="content"
                    {...register("content", {
                      required: "Content is required",
                    })}
                  />
                </div>
                {errors.content && (
                  <p className="text-red-600">{errors.content.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full flex items-center justify-between gap-2">
                  <label htmlFor="author">Author</label>
                  <input
                    className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="author"
                    {...register("author", {
                      required: "author is required",
                    })}
                  />
                </div>
                {errors.author && (
                  <p className="text-red-600">{errors.author.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full flex items-center justify-between gap-2">
                  <label htmlFor="image">Image</label>
                  <input
                    className="p-2 rounded-[8px] w-4/5 border border-[#4fec5c] outline-none focus:border-[#48a850]"
                    id="image"
                    defaultValue={content.image}
                    {...register("image", {
                      required: "Image is required",
                    })}
                  />
                </div>
                {errors.image && (
                  <p className="text-red-600">{errors.image.message}</p>
                )}
              </div>
            </section>
            <button
              type="submit"
              className="bg-green-400 rounded-full p-2 uppercase"
            >
              Edit
            </button>
          </form>
          <ProductImageUpload onUploadComplete={handleImageUpload} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditBlog;
