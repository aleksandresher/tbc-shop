import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const BlogSearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search blogs..."
      value={searchTerm}
      onChange={handleChange}
      className="w-1/2  md:w-1/6 mb-4 p-2 border border-black rounded-[6px] outline-none "
    />
  );
};

export default BlogSearchBar;
