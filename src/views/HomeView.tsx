import { useContext, useState } from "react";
import {
  Button,
  FormField,
  MultilineInput,
  NumberInput,
  PlusIcon,
  Rows,
} from "@canva/app-ui-kit";
import LayoutSelector from "../components/LayoutSelector";
import ThemeSelector from "../components/ThemeSelector";
import GenreSelector from "../components/GenreSelector";
import { AIContext } from "src/contexts/AIContextProvider";
import styles from "styles/components.css";

export const HomeView = () => {
  const {
    prompt,
    layout,
    theme,
    genre,
    totalSlides,
    setPrompt,
    setLayout,
    setTheme,
    setGenre,
    setTotalSlides,
  } = useContext(AIContext);

  return (
    <div className={styles.homeView}>
      <Rows spacing="2u">
        <FormField
          control={(_props) => (
            <MultilineInput
              autoGrow
              value={prompt}
              onChange={(text) => setPrompt(text)}
            />
          )}
          description="Please enter an AI prompt to generate a cool design"
          label="Enter Prompt"
        />
        <FormField
          control={(_props) => (
            <ThemeSelector onSelect={setTheme} selectedThemeIndex={theme} />
          )}
          label="Select theme"
        />

        <FormField
          control={(props) => (
            <GenreSelector genre={genre} onSelect={setGenre} {...props} />
          )}
          label="Genre"
        />

        <FormField
          control={(_props) => (
            <NumberInput
              decrementAriaLabel="Decrease total slides"
              defaultValue={8}
              min={1}
              max={15}
              hasSpinButtons
              incrementAriaLabel="Increase total slides"
              step={1}
              value={totalSlides}
              onChange={(value) => setTotalSlides(value)}
            />
          )}
          label="No of Slides"
        />

        <FormField
          control={(props) => (
            <LayoutSelector
              layout={layout}
              onSelect={(index) => setLayout(index)}
              {...props}
            />
          )}
          label="Select Layout"
        />
      </Rows>
    </div>
  );
};
