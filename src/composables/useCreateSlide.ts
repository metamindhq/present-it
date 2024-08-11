import { upload } from "@canva/asset";
import { addAudioTrack, addNativeElement, addPage } from "@canva/design";
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

  const renderNarration = async (audioUrl: any) => {
    const result = await upload({
      type: "AUDIO",
      title: "Narration",
      url: audioUrl.audio_public_url,
      mimeType: "audio/mp3",
      durationMs: audioUrl.audio_length_in_sec,
    });
    await result.whenUploaded();
    await addAudioTrack({
      ref: result.ref,
    });
  }

  return { renderLayout, renderImage, renderNarration };
}

export default useCreateSlide;