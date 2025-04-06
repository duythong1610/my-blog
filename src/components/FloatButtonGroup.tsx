import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaReddit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Tooltip } from "antd";

const FloatButtonGroup = () => {
  const currentUrl = window.location.href;

  console.log({ currentUrl });

  return (
    <div className="md:sticky md:top-[100px] md:h-max md:py-[200px] md:max-w-[400px] w-[50px]">
      <div className="flex flex-col gap-3 items-center">
        {/* Nút chia sẻ Facebook */}
        <Tooltip title="Chia sẻ bài viết đến facebook">
          <FacebookShareButton url={currentUrl}>
            <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100">
              <FaFacebook className="text-2xl" />
            </div>
          </FacebookShareButton>
        </Tooltip>

        {/* Nút chia sẻ Twitter */}
        <Tooltip title="Chia sẻ bài viết đến twitter">
          <TwitterShareButton url={currentUrl}>
            <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100">
              <BsTwitterX className="text-lg" />
            </div>
          </TwitterShareButton>
        </Tooltip>

        {/* Nút chia sẻ Reddit */}
        <Tooltip title="Chia sẻ bài viết đến reddit">
          <RedditShareButton url={currentUrl}>
            <div className="rounded-full w-10 h-10 flex items-center justify-center border border-[#ccc] hover:bg-gray-100">
              <FaReddit className="text-2xl" />
            </div>
          </RedditShareButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default FloatButtonGroup;
