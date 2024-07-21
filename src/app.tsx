import {
  Button,
  FormField,
  MultilineInput,
  NumberInput,
  PlusIcon,
  Rows,
} from "@canva/app-ui-kit";
import { useState } from "react";
import styles from "styles/components.css";
import LayoutSelector from "./components/LayoutSelector";
import ThemeSelector from "./components/ThemeSelector";
import GenreSelector from "./components/GenreSelector";
import useCreateSlide from "./composables/useCreateSlide";

export const App = () => {
  const [prompt, setPrompt] = useState("");
  const [layout, setLayout] = useState(0);
  const [theme, setTheme] = useState(0);
  const [genre, setGenre] = useState("any");
  const [isLoading, setIsLoading] = useState(false);

  const { renderLayout } = useCreateSlide();

  const handleCreateButtonClick = async () => {
    setIsLoading(true);
    // Mocking the AI response
    const aiResponse = {
      title: "Introduction to Artificial Intelligence",
      subtitle: "AI Overview",
      description:
        "Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions) and self-correction.\n\n• Option 1\n• Option 2\n• Option 3",
      backgroundImage:
        "https://www.canva.dev/example-assets/image-import/grass-image-thumbnail.jpg",
      primaryElement: {
        type: "IMAGE",
        data: "https://www.canva.dev/example-assets/image-import/image.jpg",
      },
    };

    await renderLayout(aiResponse, layout, theme);
    setIsLoading(false);
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <FormField
          control={(props) => (
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
          control={(props) => (
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
          control={(props) => (
            <NumberInput
              decrementAriaLabel="Decrease total slides"
              defaultValue={8}
              min={1}
              max={15}
              hasSpinButtons
              incrementAriaLabel="Increase total slides"
              step={1}
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

        <Button
          stretch
          variant="primary"
          onClick={handleCreateButtonClick}
          icon={() => <PlusIcon />}
          loading={isLoading}
          // disabled={
          //   prompt === "" || layout === -1 || theme === -1 || genre === ""
          // }
        >
          Create
        </Button>
      </Rows>
    </div>
  );
};
