import { upload } from "@canva/asset";
import { getDefaultPageDimensions } from "@canva/design";

import type { Dimensions, QueuedImage } from "@canva/asset";
import type { NativeElementWithBox, PageBackgroundFill } from "@canva/design";
import { themes } from "src/components/ThemeSelector";

export interface AiResponse {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  primaryElement: {
    type: string;
    data: string;
  };
}

export interface GetLayoutConfigProps {
  data: AiResponse;
  layoutIndex: number;
}

export interface Page {
  elements: NativeElementWithBox[];
  background: PageBackgroundFill
  title: string
}

export const getPresets = (
  data: AiResponse,
  primaryImage: QueuedImage,
  backgroundImage: QueuedImage,
  defaultPageDimensions: Dimensions | undefined,
  themeIndex: number
): Page[] => {
  if (!defaultPageDimensions) {
    throw new Error("Default page dimensions are not available");
  }

  const foregroundColor = themes[themeIndex][0];
  const backgroundColor = themes[themeIndex][1];

  return [
    {
      elements: [
        {
          type: "TEXT",
          fontSize: 24,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.subtitle],
          top: 120,
          left: 120,
        },
        {
          type: "TEXT",
          fontSize: 48,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 160,
          left: 120,
        },
        {
          type: "TEXT",
          fontSize: 30,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 300,
          left: 120,
          width: 900,
        },
        {
          type: "IMAGE",
          ref: backgroundImage.ref,
          top: 0,
          left: defaultPageDimensions.width - 400,
          width: 400,
          height: defaultPageDimensions.height,
        },
        {
          type: "IMAGE",
          ref: primaryImage.ref,
          top: defaultPageDimensions.height * 0.125,
          left: 1200,
          width: 'auto',
          height: defaultPageDimensions.height * 0.75,
        },
      ],
      background: {
        color: backgroundColor,
      },
      title: data.title
    },
    {
      elements: [
        {
          type: "TEXT",
          fontSize: 24,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.subtitle],
          top: 190,
          left: defaultPageDimensions.width * 0.5,
        },
        {
          type: "TEXT",
          fontSize: 48,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 230,
          left: defaultPageDimensions.width * 0.5,
        },
        {
          type: "TEXT",
          fontSize: 30,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 370,
          left: defaultPageDimensions.width * 0.5,
          width: 900,
        },
        {
          type: "IMAGE",
          ref: backgroundImage.ref,
          top: 0,
          left: 0,
          width: defaultPageDimensions.width,
          height: defaultPageDimensions.height * 0.145,
        },
        {
          type: "IMAGE",
          ref: primaryImage.ref,
          top: 190,
          left: 30,
          width: defaultPageDimensions.width * 0.5 - 60,
          height: defaultPageDimensions.height * 0.79,
        },
      ],
      background: {
        color: backgroundColor,
      },
      title: data.title
    },
    {
      elements: [
        {
          type: "TEXT",
          fontSize: 24,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.subtitle],
          top: 120,
          left: defaultPageDimensions.width * 0.45,
        },
        {
          type: "TEXT",
          fontSize: 48,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 160,
          left: defaultPageDimensions.width * 0.45,
        },
        {
          type: "TEXT",
          fontSize: 30,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 300,
          left: defaultPageDimensions.width * 0.45,
          width: 900,
        },
        {
          type: "IMAGE",
          ref: backgroundImage.ref,
          top: 0,
          left: 0,
          width: 400,
          height: defaultPageDimensions.height,
        },
        {
          type: "IMAGE",
          ref: primaryImage.ref,
          top: defaultPageDimensions.height * 0.125,
          left: 120,
          width: 'auto',
          height: defaultPageDimensions.height * 0.75,
        },
      ],
      background: {
        color: backgroundColor,
      },
      title: data.title
    },
    {
      elements: [
        {
          type: "TEXT",
          fontSize: 24,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.subtitle],
          top: 190,
          left: 30,
        },
        {
          type: "TEXT",
          fontSize: 48,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 230,
          left: 30,
        },
        {
          type: "TEXT",
          fontSize: 30,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 370,
          left: 30,
          width: 900,
        },
        {
          type: "IMAGE",
          ref: backgroundImage.ref,
          top: 0,
          left: 0,
          width: defaultPageDimensions.width,
          height: defaultPageDimensions.height * 0.145,
        },
        {
          type: "IMAGE",
          ref: primaryImage.ref,
          top: 190,
          left: defaultPageDimensions.width * 0.5 + 30,
          width: defaultPageDimensions.width * 0.5 - 60,
          height: defaultPageDimensions.height * 0.79,
        },
      ],
      background: {
        color: backgroundColor,
      },
      title: data.title
    },
  ]
}

export const getLayoutConfig = async (data: AiResponse, layoutIndex: number, themeIndex: number): Promise<Page> => {
  const defaultPageDimensions = await getDefaultPageDimensions();

  const primaryImage = await upload({
    type: "IMAGE",
    mimeType: "image/jpeg",
    url: data.primaryElement.data,
    thumbnailUrl: data.primaryElement.data,
  });

  const backgroundImage = await upload({
    type: "IMAGE",
    mimeType: "image/jpeg",
    url: data.backgroundImage,
    thumbnailUrl: data.backgroundImage
  });

  const presets = getPresets(data, primaryImage, backgroundImage, defaultPageDimensions, themeIndex);
  return presets[layoutIndex];
}
