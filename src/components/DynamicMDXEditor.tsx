import dynamic from "next/dynamic";

// Sử dụng dynamic import để tránh lỗi SSR
const DynamicMDXEditor = dynamic(() => import("./MDXEditor"), {
  ssr: false, // Tắt Server-Side Rendering
  loading: () => (
    <div className="p-4 border border-gray-300 rounded-md">
      Đang tải trình soạn thảo...
    </div>
  ),
});

export default DynamicMDXEditor;

DynamicMDXEditor.displayName = "DynamicMDXEditor";
