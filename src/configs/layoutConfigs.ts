import { upload } from "@canva/asset";
import { getDefaultPageDimensions } from "@canva/design";

import type { Dimensions, QueuedImage } from "@canva/asset";
import type { NativeElementWithBox, PageBackgroundFill } from "@canva/design";
import { themes } from "src/components/ThemeSelector";

export interface SlideContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface GetLayoutConfigProps {
  data: SlideContent;
  layoutIndex: number;
}

export interface Page {
  elements: NativeElementWithBox[];
  background: PageBackgroundFill
  title: string
}

export const getLayoutPresets = (
  data: SlideContent,
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
          fontSize: 52,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 160,
          left: 120,
        },
        {
          type: "TEXT",
          fontSize: 34,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 300,
          left: 120,
          width: 900,
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
          fontSize: 52,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 230,
          left: defaultPageDimensions.width * 0.5,
        },
        {
          type: "TEXT",
          fontSize: 34,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 370,
          left: defaultPageDimensions.width * 0.5,
          width: 900,
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
          fontSize: 52,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 160,
          left: defaultPageDimensions.width * 0.45,
        },
        {
          type: "TEXT",
          fontSize: 34,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 300,
          left: defaultPageDimensions.width * 0.45,
          width: 900,
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
          left: 40,
        },
        {
          type: "TEXT",
          fontSize: 52,
          fontWeight: "bold",
          color: foregroundColor,
          children: [data.title],
          top: 230,
          left: 40,
        },
        {
          type: "TEXT",
          fontSize: 34,
          fontWeight: "medium",
          color: foregroundColor,
          children: [data.description],
          top: 370,
          left: 40,
          width: 900,
        },
      ],
      background: {
        color: backgroundColor,
      },
      title: data.title
    },
  ]
}

export const getImagePresets = async (data: string, defaultPageDimensions: Dimensions | undefined): Promise<any> => {
  if (!defaultPageDimensions) {
    throw new Error("Default page dimensions are not available");
  }

  const image = await upload({
    type: "IMAGE",
    mimeType: "image/webp",
    url: data,
    thumbnailUrl: data,
  })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });

  await image.whenUploaded();

  return [
    [
      {
        type: "IMAGE",
        ref: image.ref,
        top: 0,
        left: defaultPageDimensions.width - 400,
        width: 400,
        height: defaultPageDimensions.height,
      },
      {
        type: "IMAGE",
        ref: image.ref,
        top: defaultPageDimensions.height * 0.125,
        left: 1200,
        width: defaultPageDimensions.width * 0.5 - 344,
        height: defaultPageDimensions.height * 0.75,
      },

    ],
    [
      {
        type: "IMAGE",
        ref: image.ref,
        top: 0,
        left: 0,
        width: defaultPageDimensions.width,
        height: defaultPageDimensions.height * 0.145,
      },
      {
        type: "IMAGE",
        ref: image.ref,
        top: 190,
        left: 30,
        width: defaultPageDimensions.width * 0.5 - 60,
        height: defaultPageDimensions.height * 0.79,
      },

    ],
    [
      {
        type: "IMAGE",
        ref: image.ref,
        top: 0,
        left: 0,
        width: 400,
        height: defaultPageDimensions.height,
      },
      {
        type: "IMAGE",
        ref: image.ref,
        top: defaultPageDimensions.height * 0.125,
        left: 120,
        width: defaultPageDimensions.width * 0.5 - 344,
        height: defaultPageDimensions.height * 0.75,
      },
    ],
    [

      {
        type: "IMAGE",
        ref: image.ref,
        top: 0,
        left: 0,
        width: defaultPageDimensions.width,
        height: defaultPageDimensions.height * 0.145,
      },
      {
        type: "IMAGE",
        ref: image.ref,
        top: 190,
        left: defaultPageDimensions.width * 0.5 + 30,
        width: defaultPageDimensions.width * 0.5 - 60,
        height: defaultPageDimensions.height * 0.79,
      },
    ]
  ]
}

export const getLayoutConfig = async (data: SlideContent, layoutIndex: number, themeIndex: number): Promise<Page> => {
  const defaultPageDimensions = await getDefaultPageDimensions();
  const presets = getLayoutPresets(data, defaultPageDimensions, themeIndex);
  return presets[layoutIndex];
}

export const getImageConfig = async (data: string, layoutIndex: number, imageType: number): Promise<NativeElementWithBox> => {
  const defaultPageDimensions = await getDefaultPageDimensions();
  const presets = await getImagePresets(data, defaultPageDimensions);
  return presets[layoutIndex][imageType];
}