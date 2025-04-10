"use client";
import { usePost } from "@/hooks/usePost";
import PostCard from "./Post/PostCard";
import FilterSidebar from "./FilterSidebar";
import { useCallback } from "react";
import { debounce } from "lodash";
import { Pagination, Select } from "antd";

const PostSection = () => {
  const { posts, loadingPost, setQueryPost, queryPost, totalPost } = usePost({
    initQuery: {
      page: 1,
      limit: 9,
      sortBy: "latest",
    },
  });

  console.log(totalPost);

  console.log(loadingPost);

  const handleSearch = useCallback(
    debounce((keyword: string) => {
      setQueryPost((prevQuery) => ({ ...prevQuery, page: 1, search: keyword }));
    }, 300),
    []
  );

  const handleTagClick = useCallback((tagId: string) => {
    setQueryPost((prevQuery) => ({ ...prevQuery, page: 1, tags: tagId }));
  }, []);

  const handlePageChange = (page: number) => {
    setQueryPost((prevQuery) => ({ ...prevQuery, page }));
  };

  const handleSortChange = (value: string) => {
    setQueryPost((prevQuery) => ({ ...prevQuery, sortBy: value, page: 1 }));
  };

  return (
    <>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-extrabold text-xl md:text-3xl text-[#050505] dark:text-white leading-[50px]">
            Tất cả bài viết
          </h1>
          <Select
            size="large"
            defaultValue={queryPost.sortBy}
            onChange={handleSortChange}
            className="md:w-[200px] w-[150px]"
          >
            <Select.Option value="latest">Mới nhất</Select.Option>
            <Select.Option value="oldest">Cũ nhất</Select.Option>
            <Select.Option value="popular">Phổ biến nhất</Select.Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 md:gap-y-[48px]">
          {loadingPost
            ? Array.from({ length: 6 }).map((_, index) => (
                <PostCard loading={true} key={index} post={{} as any} />
              ))
            : posts?.map((post) => (
                <PostCard loading={false} key={post._id} post={post} />
              ))}
        </div>
        <div className="flex justify-center mt-10">
          <Pagination
            current={queryPost.page}
            pageSize={queryPost.limit}
            total={totalPost}
            onChange={handlePageChange}
            showSizeChanger={false}
            hideOnSinglePage={true}
            // className="pagination-custom"
          />
        </div>
      </div>
      <FilterSidebar onSearch={handleSearch} onTagClick={handleTagClick} />
    </>
  );
};

export default PostSection;
