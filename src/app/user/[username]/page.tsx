import { getUserDetail } from "@/services/user";
import { formatDate } from "@/utils/date";
import { Col, Divider, Row, Tabs, Tooltip } from "antd";
import { TabsProps } from "antd/lib";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedal,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";
import FollowAction from "../components/FollowAction";
import FollowerList from "../components/FollowerList";
import FollowingList from "../components/FollowingList";
import UserPost from "../components/UserPost";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import UserSummary from "../components/UserSummary";

interface UserDetailPageProps {
  params: { username: string };
}

// 👇 Thêm sau export của component
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUserDetail(params.username);

  return {
    title: `${user.fullName} (@${user.username}) | WriteFlow`,
    description:
      user.bio || "Tham gia cộng đồng chia sẻ tri thức tại WriteFlow.",
    openGraph: {
      title: `${user.fullName} (@${user.username}) | WriteFlow`,
      description:
        user.bio || "Tham gia cộng đồng chia sẻ tri thức tại WriteFlow.",
      url: `https://writeflow.asia/user/${user.username}`,
      siteName: "WriteFlow",
      images: [
        {
          url: user.avatar,
          width: 800,
          height: 800,
          alt: `${user.fullName} avatar`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.fullName} (@${user.username}) | WriteFlow`,
      description:
        user.bio || "Tham gia cộng đồng chia sẻ tri thức tại WriteFlow.",
      images: [user.avatar],
    },
    metadataBase: new URL("https://writeflow.asia/"),
  };
}

const UserDetailPage: NextPage<UserDetailPageProps> = async ({ params }) => {
  const user = await getUserDetail(params.username);

  console.log({ user });

  const items: TabsProps["items"] = [
    {
      key: "info",
      label: "Thông tin",
      children: (
        <div className="min-h-screen dark:text-white">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Column (span=8) */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {/* Giới thiệu */}
              <div className="bg-gray-50 dark:bg-[#222] rounded-xl overflow-hidden p-4">
                <h1 className="text-lg font-bold mb-2">Giới thiệu</h1>
                <p className="text-center">{user.bio}</p>
                <div className="border-t my-4 border-gray-200 dark:border-gray-700" />

                <div className="flex flex-col gap-3">
                  {user.dateOfBirth && (
                    <div className="flex items-center gap-2">
                      <LiaBirthdayCakeSolid className="text-xl" />
                      <p>{formatDate(user.dateOfBirth)}</p>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <TfiEmail className="text-xl" />
                      <Link
                        href={`mailto:${user.email}`}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.email}
                      </Link>
                    </div>
                  )}
                  {user.socialMedia?.facebook && (
                    <div className="flex items-center gap-2">
                      <FaFacebook className="text-xl" />
                      <Link
                        href={user.socialMedia.facebook}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.socialMedia.facebook}
                      </Link>
                    </div>
                  )}
                  {user.socialMedia?.twitter && (
                    <div className="flex items-center gap-2">
                      <FaXTwitter className="text-xl" />
                      <Link
                        href={user.socialMedia.twitter}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.socialMedia.twitter}
                      </Link>
                    </div>
                  )}
                  {user.socialMedia?.instagram && (
                    <div className="flex items-center gap-2">
                      <FaInstagram className="text-xl" />
                      <Link
                        href={user.socialMedia.instagram}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.socialMedia.instagram}
                      </Link>
                    </div>
                  )}
                  {user.socialMedia?.linkedin && (
                    <div className="flex items-center gap-2">
                      <FaLinkedin className="text-xl" />
                      <Link
                        href={user.socialMedia.linkedin}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.socialMedia.linkedin}
                      </Link>
                    </div>
                  )}
                  {user.socialMedia?.github && (
                    <div className="flex items-center gap-2">
                      <FaGithub className="text-xl" />
                      <Link
                        href={user.socialMedia.github}
                        target="_blank"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {user.socialMedia.github}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#222] rounded-xl overflow-hidden p-4">
                <h1 className="text-lg font-bold mb-2">Thống kê</h1>
                <UserSummary userId={user._id} />
              </div>

              {/* Đang theo dõi */}
              <div className="bg-gray-50 dark:bg-[#222] rounded-xl overflow-hidden p-4">
                <h1 className="text-lg font-bold mb-2">Đang theo dõi</h1>
                <FollowingList userId={user._id} />
              </div>
              {/* Đang theo dõi */}
            </div>

            {/* Right Column (span=16) */}
            <div className="w-full md:w-2/3">
              <div className="bg-gray-50 dark:bg-transparent rounded-xl overflow-hidden md:p-4 h-full">
                <UserPost userId={user._id} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "followers",
      label: "Người theo dõi",
      children: (
        <div className="min-h-screen">
          <FollowerList userId={user._id} />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl m-auto">
      <div>
        <div className="relative h-[250px] md:h-[450px]">
          <div className="absolute w-full z-0">
            {user?.coverPhoto ? (
              <Image
                src={user?.coverPhoto}
                alt={"anh-bia"}
                width={1500}
                height={600}
                className="!w-full h-[250px] md:h-[450px] object-cover rounded-xl"
              ></Image>
            ) : (
              <div className="!w-full h-[250px] md:h-[450px]  rounded-xl bg-[#555]"></div>
            )}
          </div>
          <div className="absolute -bottom-[25%] md:-bottom-[90px] left-5">
            <div className="flex items-end gap-4 mb-2">
              <Image
                src={user?.avatar}
                alt={`${user.fullName} avatar`}
                width={500}
                height={500}
                className="w-[110px] h-[110px] md:w-[160px] md:h-[160px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pl-[140px] md:pl-[200px] mt-2 gap-3 flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl md:text-3xl">{user?.fullName}</p>

              {(user?.username == "writeflow" ||
                user?.username == "auduythong") && (
                <Tooltip title="Tài khoản đã được xác minh">
                  <RiVerifiedBadgeFill className="text-xl md:text-2xl fill-purple-500" />
                </Tooltip>
              )}
            </div>
            <span className="font-medium text-lg text-gray-400">
              @{user.username}
            </span>
          </div>
          <FollowAction userId={user._id} />
        </div>
      </div>

      <div className="mt-10">
        <Tabs defaultActiveKey="info" items={items} />
      </div>
    </div>
  );
};

export default UserDetailPage;
