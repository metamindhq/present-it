import AIContextProvider from "src/contexts/AIContextProvider";
import CreateButton from "src/components/CreateButton";
import Views from "src/components/Views";
import styles from "styles/components.css";

export const App = () => {
  return (
    <AIContextProvider>
      <div className={styles.app}>
        <Views />
        <CreateButton />
      </div>
    </AIContextProvider>
  );
};
