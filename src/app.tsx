import AIContextProvider from "src/contexts/AIContextProvider";
import CreateButton from "src/components/CreateButton";
import Views from "src/components/Views";
import styles from "styles/components.css";
import { getDefaultPageDimensions } from "@canva/design";
import { useEffect, useState } from "react";
import { UnsupportedDimensionsView } from "./views/UnsupportedDimensionsView";

export const App = () => {
  const [isValidDimensions, setIsValidDimensions] = useState(false);
  const allowedDimensions = [{ width: 1920, height: 1080 }];
  useEffect(() => {
    getDefaultPageDimensions().then((dimensions) => {
      if (!dimensions) return;
      const { width, height } = dimensions;
      const isValid = allowedDimensions.some(
        (dim) => dim.width === width && dim.height === height
      );
      setIsValidDimensions(isValid);
    });
  }, []);

  return (
    <AIContextProvider>
      {isValidDimensions ? (
        <div className={styles.app}>
          <Views />
          <CreateButton />
        </div>
      ) : (
        <UnsupportedDimensionsView />
      )}
    </AIContextProvider>
  );
};
