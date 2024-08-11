import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@canva/app-ui-kit";
import { HomeView } from "src/views/HomeView";
import { NarationView } from "src/views/NarrationView";
import styles from "styles/components.css";

export default function Views() {
  return (
    <Tabs>
      <div className={styles.tabList}>
        <TabList>
          <Tab id="home">General</Tab>
          <Tab id="audio">Narration</Tab>
        </TabList>
      </div>
      <TabPanels>
        <TabPanel id="home">
          <HomeView />
        </TabPanel>
        <TabPanel id="audio">
          <NarationView />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
