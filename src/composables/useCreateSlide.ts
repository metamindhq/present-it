import { addNativeElement, addPage } from "@canva/design";
import { getImageConfig, getImagePresets, getLayoutConfig } from "src/configs/layoutConfigs";

import type { SlideContent } from "src/configs/layoutConfigs";

const useCreateSlide = () => {
  const renderLayout = async (aiResponse: SlideContent, layoutIndex = 0, themeIndex = 0) => {
    const layout = await getLayoutConfig(aiResponse, layoutIndex, themeIndex);
    await addPage(layout)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  const renderImage = async (imageUrl: string, layoutIndex = 0, imageType = 0) => {
    const layout = await getImageConfig(imageUrl, layoutIndex, imageType);
    await addNativeElement(layout)
  }

  return { renderLayout, renderImage };
}

export default useCreateSlide;