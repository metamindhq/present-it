import {
  Box,
  Button,
  LoadingIndicator,
  PlusIcon,
  ProgressBar,
  Rows,
} from "@canva/app-ui-kit";
import { useContext, useState } from "react";
import useAPI from "src/composables/useAPI";
import useCreateSlide from "src/composables/useCreateSlide";
import type { SlideContent } from "src/configs/layoutConfigs";
import { AIContext } from "src/contexts/AIContextProvider";
import styles from "styles/components.css";
import { themes } from "./ThemeSelector";

export default function CreateButton() {
  const { layout, theme, prompt, genre, totalSlides, isLoading, setIsLoading } =
    useContext(AIContext);

  const [progress, setProgress] = useState<number>(0);

  const { renderLayout, renderImage } = useCreateSlide();
  const { generate, generateImage } = useAPI();

  const handleCreateButtonClick = async () => {
    setIsLoading(true);
    setProgress(0);

    let prevSlideSummaries = "";
    for (let slideNum = 0; slideNum < totalSlides; slideNum++) {
      const aiResponse = await generate(slideNum + 1, prevSlideSummaries);

      prevSlideSummaries += `Slide ${slideNum + 1}
Title: ${aiResponse.title}
Content: ${
        aiResponse.content + "\n\n• " + aiResponse.bullet_points.join("\n\n• ")
      }\n\n`;

      const slideContent: SlideContent = {
        title: aiResponse.title,
        subtitle: aiResponse.subtitle,
        description:
          aiResponse.content +
          "\n\n• " +
          aiResponse.bullet_points.join("\n\n• "),
      };
      await renderLayout(slideContent, layout, theme);

      const aiImageResponse = await generateImage(
        aiResponse.image_generation_prompt + " no text allowed strictly"
      );
      await renderImage(aiImageResponse.image_public_url, layout, 0);

      const aiBgImageResponse = await generateImage(
        "Generate a photo-realistic background image for a slide about " +
          aiResponse.summary +
          " using the following colors " +
          themes[theme].join(",")
      );
      await renderImage(aiBgImageResponse.image_public_url, layout, 1);

      setProgress((slideNum + 1 / totalSlides) * 100);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.createButtonContainer}>
      <Rows spacing="1u">
        {!isLoading && (
          <Button
            stretch
            variant="primary"
            onClick={handleCreateButtonClick}
            icon={() => <PlusIcon />}
            loading={isLoading}
            disabled={
              prompt === "" || layout === -1 || theme === -1 || genre === ""
            }
          >
            Create
          </Button>
        )}
        {isLoading && (
          <Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "0.75rem",
                height: "3.6rem",
              }}
            >
              <LoadingIndicator size="large" />
              <div
                style={{
                  width: "100%",
                }}
              >
                <ProgressBar size="small" tone="info" value={progress} />
              </div>
            </div>
          </Box>
        )}
      </Rows>
    </div>
  );
}
