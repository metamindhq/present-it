import type { SetStateAction, Dispatch } from "react";
import React, { createContext, useState } from "react";

type AIContextType = {
  prompt: string;
  layout: number;
  theme: number;
  genre: string;
  totalSlides: number;
  isLoading: boolean;
  isAddNarrations: boolean;
  selectedNarrator: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  setLayout: Dispatch<SetStateAction<number>>;
  setTheme: Dispatch<SetStateAction<number>>;
  setGenre: Dispatch<SetStateAction<string>>;
  setTotalSlides: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsAddNarrations: Dispatch<SetStateAction<boolean>>;
  setSelectedNarrator: Dispatch<SetStateAction<string>>;
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
  isAddNarrations: true,
  selectedNarrator: "Scarlett",
  setPrompt: () => {},
  setLayout: () => {},
  setTheme: () => {},
  setGenre: () => {},
  setTotalSlides: () => {},
  setIsLoading: () => {},
  setIsAddNarrations: () => {},
  setSelectedNarrator: () => {},
});

const AIContextProvider = ({ children }: AIContextProviderProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [layout, setLayout] = useState<number>(0);
  const [theme, setTheme] = useState<number>(0);
  const [genre, setGenre] = useState<string>("any");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalSlides, setTotalSlides] = useState<number>(8);
  const [isAddNarrations, setIsAddNarrations] = useState<boolean>(true);
  const [selectedNarrator, setSelectedNarrator] = useState<string>("Scarlett");

  return (
    <AIContext.Provider
      value={{
        prompt,
        layout,
        theme,
        genre,
        totalSlides,
        isLoading,
        isAddNarrations,
        selectedNarrator,
        setPrompt,
        setLayout,
        setTheme,
        setGenre,
        setTotalSlides,
        setIsAddNarrations,
        setSelectedNarrator,
        setIsLoading,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContextProvider;
