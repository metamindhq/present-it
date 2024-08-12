import React from "react";
import { Grid, ImageCard } from "@canva/app-ui-kit";

interface LayoutSelectorProps {
  layout: number;
  onSelect: (index: number) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layout,
  onSelect,
}) => {
  const themeThumbnails = [
    "https://i.ibb.co/LSgYF1y/Slide-16-9-10.png",
    "https://i.ibb.co/qm8DTWG/Slide-16-9-12.png",
    "https://i.ibb.co/rZZ6yqc/Slide-16-9-11.png",
    "https://i.ibb.co/68fjZY5/Slide-16-9-13.png",
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 58rem)",
        overflow: "auto",
        borderRadius: "8px",
      }}
    >
      <Grid spacing="2u" columns={1} alignX="stretch">
        {themeThumbnails.map((thumbnail, index) => (
          <ImageCard
            key={index}
            alt={`Template ${index + 1}`}
            ariaLabel="Add image to design"
            borderRadius="standard"
            onClick={() => {
              onSelect(index);
            }}
            thumbnailUrl={thumbnail}
            selectable
            selected={layout === index}
          />
        ))}
      </Grid>
    </div>
  );
};

export default LayoutSelector;
