import { Button, PlusIcon, ProgressBar, Rows } from "@canva/app-ui-kit";
import { useContext, useState } from "react";
import useAPI from "src/composables/useAPI";
import useCreateSlide from "src/composables/useCreateSlide";
import type { SlideContent } from "src/configs/layoutConfigs";
import { AIContext } from "src/contexts/AIContextProvider";
import styles from "styles/components.css";

export default function CreateButton() {
  const { layout, theme, prompt, genre, totalSlides, isLoading, setIsLoading } =
    useContext(AIContext);

  const [progress, setProgress] = useState<number>(0);

  const { renderLayout, renderImage } = useCreateSlide();
  const { generate, generateImage } = useAPI();

  const handleCreateButtonClick = async () => {
    setIsLoading(true);

    let prevSlideSummaries = "";
    for (let slideNum = 0; slideNum < totalSlides; slideNum++) {
      const aiResponse = await generate(slideNum, prevSlideSummaries);

      prevSlideSummaries += aiResponse.summary;

      const slideContent: SlideContent = {
        title: aiResponse.title,
        subtitle: aiResponse.subtitle,
        description:
          aiResponse.content + "\n" + aiResponse.bullet_points.join("\n"),
      };
      await renderLayout(slideContent, layout, theme);

      const aiImageResponse = await generateImage(
        aiResponse.image_generation_prompt
      );
      await renderImage(aiImageResponse.image_public_url, layout, 0);

      const aiBgImageResponse = await generateImage(
        'Generate a background image for a slide about "' +
          aiResponse.title +
          '"'
      );
      await renderImage(aiBgImageResponse.image_public_url, layout, 1);

      setProgress((slideNum / totalSlides) * 100);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.createButtonContainer}>
      <Rows spacing="1u">
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
        {isLoading && <ProgressBar size="small" tone="info" value={progress} />}
      </Rows>
    </div>
  );
}
