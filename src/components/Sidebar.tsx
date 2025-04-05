import TagFilter from "./Tags/TagFilter";

export default function Sidebar() {
  return (
    <div className="w-full md:w-[366px] md:sticky top-[88px] h-max">
      <TagFilter />
    </div>
  );
}
