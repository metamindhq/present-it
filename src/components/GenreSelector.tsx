import React from "react";
import { Select } from "@canva/app-ui-kit";

interface GenreSelectorProps {
  genre: string;
  onSelect: (index: string) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ genre, onSelect }) => {
  return (
    <Select
      options={[
        {
          label: "Any",
          value: "any",
          description: "A random genre",
        },
        {
          label: "Educational",
          value: "educational",
          description: "For educational purposes",
        },
        {
          label: "Corporate",
          value: "corporate",
          description: "For corporate purposes",
        },
        {
          label: "Informal",
          value: "informal",
          description: "For informal purposes",
        },
        {
          label: "Wedding",
          value: "wedding",
          description: "For wedding purposes",
        },
        {
          label: "Birthday",
          value: "birthday",
          description: "For birthday purposes",
        },
      ]}
      stretch
      value={genre}
      onChange={(index) => onSelect(index)}
    />
  );
};

export default GenreSelector;
