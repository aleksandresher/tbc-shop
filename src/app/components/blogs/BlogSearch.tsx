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
      className="w-full mb-4 p-2 border border-gray-300 rounded"
    />
  );
};

export default BlogSearchBar;
