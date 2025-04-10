import React, { useState } from "react";
import { Upload, message, UploadProps, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import { SlCloudUpload } from "react-icons/sl";

interface ThumbnailPostUploadProps {
  onUploadOk: (url: string) => void;
  imageUrl: string;
}

const ThumbnailPostUpload: React.FC<ThumbnailPostUploadProps> = ({
  onUploadOk,
  imageUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const uploadProps: UploadProps = {
    name: "file",
    action: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    data: (file) => ({
      upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
      file,
    }),
    showUploadList: false,
    beforeUpload(file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ hỗ trợ tải ảnh!");
      }
      return isImage;
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setLoading(true);
        setUploadPercent(Math.round(info.file.percent || 0));
      }
      if (info.file.status === "done") {
        setLoading(false);
        setUploadPercent(0);
        if (info.file.response?.secure_url) {
          onUploadOk(info.file.response.secure_url);
        } else {
          message.error("Tải ảnh thất bại!");
        }
      } else if (info.file.status === "error") {
        setLoading(false);
        setUploadPercent(0);
        message.error("Tải ảnh thất bại!");
      }
    },
  };

  return (
    <div className="flex flex-col items-center">
      <Upload {...uploadProps}>
        <div className="relative w-[300px] h-[200px] rounded-lg border-2 dark:bg-[#222] border-purple-500 border-dashed flex items-center justify-center overflow-hidden shadow-lg duration-200 cursor-pointer">
          {loading ? (
            <div className="absolute bottom-10 w-full px-4">
              <div className="w-full h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
            </div>
          ) : imageUrl ? (
            <Image
              width={500}
              height={500}
              src={imageUrl}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center z-10">
              <SlCloudUpload className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">Tải ảnh lên</p>
            </div>
          )}

          <div className="absolute bottom-0 bg-purple-500 bg-opacity-80 text-white text-xs p-1 w-full text-center z-20">
            {loading ? `Đang tải... (${uploadPercent}%)` : "Chọn ảnh"}
          </div>
        </div>
      </Upload>
    </div>
  );
};

export default ThumbnailPostUpload;
