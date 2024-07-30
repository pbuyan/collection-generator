import React, { FC, useState } from "react";
import { BsDownload } from "react-icons/bs";
import FileSaver from "file-saver";
import Spinner from "@/components/Spinner";
import Image from "next/image";

interface Props {
  images: {
    url: string;
  }[];
  loading: boolean;
}

const GeneratedImages: FC<Props> = ({ images = [], loading }) => {
  const ImageCard = ({ url }: { url: string }) => {
    const [loading, setLoading] = useState(false);

    const downloadImage = async (url: string) => {
      setLoading(true);
      let response = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        FileSaver.saveAs(blob, "image.png");
      } else {
        console.error("some error");
      }
      setLoading(false);
    };

    return (
      <div
        className={"p-1 group bg-transparent relative mb-5 w-full shadow-md"}
      >
        <div className={"h-auto hover:opacity-75"}>
          <Image src={url} className={"rounded-md object-contain"} alt="" />
        </div>
        <div className={"absolute right-4 top-4 text-white"}>
          {loading ? (
            <Spinner />
          ) : (
            <button
              onClick={() => downloadImage(url)}
              className={
                "hidden group-hover:block p-2 rounded-full bg-white group-hover:bg-primary-light"
              }
            >
              <BsDownload size={18} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={"mt-4 pt-4 border-t"}>
        {loading ? (
          <div className={"h-100 flex flex-col justify-center items-center"}>
            <p className={"text-md text-primary-main font-bold my-10"}>
              Generating Images...
            </p>
            <Image
              src={"/no-data.svg"}
              alt={"no data image"}
              className={"w-1/3 sm:w-1/5 h-auto"}
            />
          </div>
        ) : images.length > 0 ? (
          <div
            className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"}
          >
            {images.map(({ url }, index) => (
              <ImageCard key={index} url={url} />
            ))}
          </div>
        ) : (
          <div className={"h-100 flex flex-col justify-center items-center"}>
            <p className={"text-md text-primary-main font-bold my-10"}>
              No Data To Display
            </p>
            <Image
              src={"/no-data.svg"}
              alt={"no data image"}
              className={"w-1/3 sm:w-1/5 h-auto"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedImages;
