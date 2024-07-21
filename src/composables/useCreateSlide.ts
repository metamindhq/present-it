import { addPage } from "@canva/design";
import { getLayoutConfig } from "src/configs/layoutConfigs";

import type { AiResponse } from "src/configs/layoutConfigs";

const useCreateSlide = () => {
  const renderLayout = async (aiResponse: AiResponse, layoutIndex = 0, themeIndex = 0) => {
    const layout = await getLayoutConfig(aiResponse, layoutIndex, themeIndex);
    await addPage(layout);
  };

  return { renderLayout };
}

export default useCreateSlide;