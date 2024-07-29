import type { SetStateAction, Dispatch } from "react";
import React, { createContext, useState } from "react";

type AIContextType = {
  prompt: string;
  layout: number;
  theme: number;
  genre: string;
  totalSlides: number;
  isLoading: boolean;
  setPrompt: Dispatch<SetStateAction<string>>;
  setLayout: Dispatch<SetStateAction<number>>;
  setTheme: Dispatch<SetStateAction<number>>;
  setGenre: Dispatch<SetStateAction<string>>;
  setTotalSlides: Dispatch<SetStateAction<number | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type AIContextProviderProps = {
  children: React.ReactNode;
};

export const AIContext = createContext<AIContextType>({
  prompt: "",
  layout: 0,
  theme: 0,
  genre: "any",
  totalSlides: 8,
  isLoading: false,
  setPrompt: () => {},
  setLayout: () => {},
  setTheme: () => {},
  setGenre: () => {},
  setTotalSlides: () => {},
  setIsLoading: () => {},
});

const AIContextProvider = ({ children }: AIContextProviderProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [layout, setLayout] = useState<number>(0);
  const [theme, setTheme] = useState<number>(0);
  const [genre, setGenre] = useState<string>("any");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalSlides, setTotalSlides] = useState<number>(8);

  return (
    <AIContext.Provider
      value={{
        prompt,
        layout,
        theme,
        genre,
        totalSlides,
        isLoading,
        setPrompt,
        setLayout,
        setTheme,
        setGenre,
        setTotalSlides,
        setIsLoading,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContextProvider;
