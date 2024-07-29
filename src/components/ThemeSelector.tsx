import React from "react";
import { Column, Columns, Swatch } from "@canva/app-ui-kit";
import type { Color } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/swatch/swatch";

interface ThemeSelectorProps {
  selectedThemeIndex: number;
  onSelect: (index: number) => void;
}

export const themes: Color[][] = [
  ["#5BBCFF", "#E5FFFD"],
  ["#FA7070", "#FFEFEF"],
  ["#419932", "#DAFFD4"],
  ["#F5E8C7", "#331D2C"],
  ["#D7D7D7", "#222831"],
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeIndex,
  onSelect,
}) => {
  return (
    <Columns spacing="2u">
      {themes.map((theme, index) => (
        <Column key={index}>
          <Swatch
            fill={theme}
            tooltipLabel=""
            variant="outline"
            onClick={() => onSelect(index)}
            active={selectedThemeIndex === index}
          />
        </Column>
      ))}
    </Columns>
  );
};

export default ThemeSelector;
