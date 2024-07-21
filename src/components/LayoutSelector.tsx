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
    "https://i.ibb.co/KXmZYR9/theme-1.png",
    "https://i.ibb.co/drq2xch/Slide-16-9-3.png",
    "https://i.ibb.co/sQsGSwm/Slide-16-9-4.png",
    "https://i.ibb.co/5sNVcXD/Slide-16-9-5.png",
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 53rem)",
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
