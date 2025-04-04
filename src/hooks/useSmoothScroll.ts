const useSmoothScroll = () => {
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add an offset to account for fixed header (adjust as needed)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Add a highlight effect
      element.classList.add("bg-yellow-100");
      setTimeout(() => {
        element.classList.remove("bg-yellow-100");
      }, 1500);
    }
  };

  return { scrollToElement };
};

export default useSmoothScroll;
