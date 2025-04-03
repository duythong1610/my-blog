import { useEffect, useState, useRef } from "react";

export function useHeadsObserver(
  ids: string[],
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = useState<string | undefined>();
  const observer = useRef<IntersectionObserver | null>(null);
  const isScrolling = useRef(false); // Để kiểm soát scroll tự động

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));

    observer.current?.disconnect(); // Ngắt kết nối nếu đã có observer
    observer.current = new IntersectionObserver((entries) => {
      if (isScrolling.current) return; // Nếu đang auto-scroll thì không cập nhật activeId

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const nearestEntry = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr
        );
        setActiveId(nearestEntry.target.id);
      }
    }, options);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [ids, options]);

  // Hàm xử lý scroll khi click vào mục tiêu
  const handleScroll = (id: string) => {
    setActiveId(id);
    isScrolling.current = true; // Đánh dấu đang scroll tự động

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Offset để tránh header che mất tiêu đề
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // Sau khi scroll xong, cho phép observer hoạt động lại
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  return { activeId, handleScroll };
}
