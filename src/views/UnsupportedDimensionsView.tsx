import { ImageCard, Rows, Title, Text, Button } from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import styles from "styles/components.css";

const CREATE_NEW_PRESENTATION_URL =
  "https://www.canva.com/design?create&type=TACQ-gtv2Yk&category=tAExRLg81RI";

export const UnsupportedDimensionsView = () => {
  function handleCreateNewPresentation() {
    requestOpenExternalUrl({
      url: CREATE_NEW_PRESENTATION_URL,
    });
  }

  return (
    <div className={styles.emptyView}>
      <Rows spacing="2u">
        <div
          style={{
            width: "8rem",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <ImageCard
            thumbnailUrl="https://i.ibb.co/m81JZFj/3bbc584b-bce1-424b-9dd6-109f3d597ff3-1.png"
            ariaLabel="Logo"
            onClick={() => {}}
          />
        </div>
        <Title>Unsupported Dimensions</Title>
        <Text>
          This plugin only supports 1920x1080 dimensions. Please change your
          document dimensions to 1920x1080.
        </Text>
        <Button variant="primary" onClick={handleCreateNewPresentation}>
          Create new presentation
        </Button>
      </Rows>
    </div>
  );
};
