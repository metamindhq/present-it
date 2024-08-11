import { FormField, Rows, Switch } from "@canva/app-ui-kit";
import { useContext, useState } from "react";
import VoiceSelector from "src/components/VoiceSelector";
import { AIContext } from "src/contexts/AIContextProvider";
import styles from "styles/components.css";

export const NarationView = () => {
  const {
    isAddNarrations,
    selectedNarrator,
    setIsAddNarrations,
    setSelectedNarrator,
  } = useContext(AIContext);
  return (
    <div className={styles.view}>
      <Rows spacing="2u">
        <Switch
          label="Add Narrations to slides"
          value={isAddNarrations}
          onChange={setIsAddNarrations}
        />
        <FormField
          control={(_props) => (
            <VoiceSelector
              voice={selectedNarrator}
              disabled={!isAddNarrations}
              onSelect={setSelectedNarrator}
            />
          )}
          label="Choose Narrator"
        />
      </Rows>
    </div>
  );
};
