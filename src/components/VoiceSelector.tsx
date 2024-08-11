import React from "react";
import { AudioCard, AudioContextProvider, Grid } from "@canva/app-ui-kit";

interface VoiceSelectorProps {
  voice: string;
  disabled?: boolean;
  onSelect: (index: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voice,
  disabled,
  onSelect,
}) => {
  const narratorVoices = [
    {
      label: "Scarlett",
      value: "Scarlett",
      thumbnailUrl: "https://i.ibb.co/MGLNKNx/image.png",
      previewUrl:
        "https://storage.googleapis.com/canva-hackathon/audio/9yk2ec.mp3",
      durationInSeconds: 7,
    },
    {
      label: "Dan",
      value: "Dan",
      thumbnailUrl: "https://i.ibb.co/tz0D44s/image.png",
      previewUrl:
        "https://storage.googleapis.com/canva-hackathon/audio/5d1nbw.mp3",
      durationInSeconds: 6,
    },
    {
      label: "Liv",
      value: "Liv",
      thumbnailUrl: "https://i.ibb.co/HGKG5yS/image.png",
      previewUrl:
        "https://storage.googleapis.com/canva-hackathon/audio/9mftzq.mp3",
      durationInSeconds: 6,
    },
    {
      label: "Will",
      value: "Will",
      thumbnailUrl: "https://i.ibb.co/CzxM2DW/image.png",
      previewUrl:
        "https://storage.googleapis.com/canva-hackathon/audio/cso15q.mp3",
      durationInSeconds: 7,
    },
    {
      label: "Amy",
      value: "Amy",
      thumbnailUrl: "https://i.ibb.co/xm8PgPv/image.png",
      previewUrl:
        "https://storage.googleapis.com/canva-hackathon/audio/5pdg6g.mp3",
      durationInSeconds: 7,
    },
  ];

  return (
    <Grid spacing="2u" columns={1} alignX="stretch">
      <AudioContextProvider>
        {narratorVoices.map((narratorVoice, index) => (
          <div
            key={index}
            style={{
              opacity: disabled ? 0.5 : 1,
              transition: "all 0.2s",
              boxShadow:
                voice === narratorVoice.value
                  ? "0 0 0 2px transparent,inset 0 0 0 2px #8b3dff"
                  : "none",
              borderRadius: "12px",
            }}
          >
            <AudioCard
              key={index}
              title={narratorVoice.label}
              audioPreviewUrl={narratorVoice.previewUrl}
              thumbnailUrl={narratorVoice.thumbnailUrl}
              durationInSeconds={narratorVoice.durationInSeconds}
              ariaLabel="Add narration to design"
              onClick={() => {
                if (disabled) return;
                onSelect(narratorVoice.value);
              }}
            />
          </div>
        ))}
      </AudioContextProvider>
    </Grid>
  );
};

export default VoiceSelector;
