import SearchBar from "./SearchBar";
import TagFilter from "./Tags/TagFilter";

export default function Sidebar() {
  return (
    <div className="w-[366px] sticky top-[88px] h-fit min-h-screen">
      <SearchBar />
      <TagFilter />
    </div>
  );
}
