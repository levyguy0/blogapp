import React from "react";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterFeed = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className="filter col-span-1">
      <div>filter</div>
    </div>
  );
};

export default FilterFeed;
