"use client";
import { useHeadsObserver } from "@/hooks/useHeadsObserver";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Collapse, CollapseProps, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import MarkdownRenderer from "../MarkdownRendered";
import { getPostDetail, increasePostView } from "@/services/post";
import FloatButtonGroup from "../FloatButtonGroup";
import PostSummary from "./PostSummary";
import CommentSystem from "../Comment/CommentSystem";
import { useAppSelector } from "@/lib/hook";
import RelatedPosts from "./RelatedPost";
import { useRelatedPost } from "@/hooks/useRelatedPost";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface PropsType {
  post: Post;
  slug: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const PostContent = ({ post, slug }: PropsType) => {
  const user = useAppSelector((state) => state.user.info);
  const commentRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery<Post>({
    queryKey: ["postDetail"],
    queryFn: () => getPostDetail(slug),
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    initialData: post,
  });

  const { relatedPosts, loadingRelatedPosts } = useRelatedPost({
    initQuery: { page: 1, limit: 50, postId: post._id },
  });

  const [headings, setHeadings] = useState<Heading[]>([]);
  const { handleScroll } = useHeadsObserver(headings.map(({ id }) => id));

  const scrollToComments = useCallback(() => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", "#comment");
  }, []);

  // Handler for when headings are extracted from markdown
  const handleHeadingsExtracted = (extractedHeadings: Heading[]) => {
    setHeadings(extractedHeadings);
  };

  useEffect(() => {
    if (slug) {
      increasePostView(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (window.location.hash === "#comment" && commentRef.current) {
      const timeout = setTimeout(() => {
        commentRef.current?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }, 500); // đợi mọi thứ render xong

      return () => clearTimeout(timeout);
    }
  }, [headings]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <label htmlFor="" className="text-xl font-bold dark:text-white">
            Nội dung bài viết
          </label>
        </div>
      ),
      children: (
        <>
          <ul className="space-y-2 mb-6">
            {headings.map(({ id, text, level }) => (
              <li key={id} style={{ paddingLeft: level === 3 ? 20 : 0 }}>
                <a
                  href={`#${id}`}
                  className="hover:underline hover:!text-purple-500 text-base font-medium dark:text-gray-400"
                  // style={{ color: activeId === id ? "#15AA7A" : "#33404A" }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      handleScroll(id);
                    }
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
          {/* <div className="flex flex-col gap-8">
            <PromoBanner type="tag" />
            <PromoBanner />
          </div> */}
        </>
      ),
    },
  ];

  if (!data) return "Bài viết không tồn tại";

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-6">
        <FloatButtonGroup author={data.author} />
        <div className="w-full md:w-[60%]">
          {/* Blog Content */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 flex-wrap">
              {post.tags.map((item) => (
                <div
                  key={item._id}
                  className="bg-purple-50 text-xs md:text-sm rounded-[8px] py-1 px-2 w-fit text-purple-500"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold my-5">{post.title}</h1>

            <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/user/${post.author.username}`}
                    className="text-[#33404A] dark:text-white font-bold"
                  >
                    <Image
                      className="object-cover rounded-full w-[64px] h-[64px]"
                      src={post.author.avatar || ""}
                      alt={"author_avatar"}
                      width={200}
                      height={200}
                    />
                  </Link>
                  <div className="flex flex-col gap-1">
                    <span>Tác giả</span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/user/${post.author.username}`}
                        className="text-[#33404A] dark:text-white font-bold"
                      >
                        {post.author?.fullName}
                      </Link>
                      {(post?.author.username == "writeflow" ||
                        post?.author.username == "auduythong") && (
                        <Tooltip title="Tài khoản đã được xác minh">
                          <RiVerifiedBadgeFill className="text-lg md:text-xl fill-purple-500" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3 mb-5 md:mb-0">
                <PostSummary onScrollComment={scrollToComments} post={data} />
                <div className="flex items-center gap-2">
                  <CiCalendar />
                  <span>Cập nhật lúc: {formatDate(post.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Use updated MarkdownRenderer with heading extraction */}
          <MarkdownRenderer
            content={post.content}
            onHeadingsExtracted={handleHeadingsExtracted}
          />
        </div>

        <div className="md:sticky md:top-[100px] md:h-max md:p-4 md:max-w-[400px] w-full md:w-[40%]">
          <Collapse
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <FaChevronDown
                className="!text-xl dark:fill-white"
                style={{ rotate: isActive ? "180deg" : "0deg" }}
              />
            )}
            defaultActiveKey={["1"]}
            bordered={false}
            items={items}
            className="w-full bg-gray-50 dark:bg-[#222]"
          ></Collapse>
        </div>
      </div>
      <div>
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </div>
      <div ref={commentRef}>
        <CommentSystem postId={post._id} currentUser={user} />
      </div>
    </>
  );
};

export default PostContent;
