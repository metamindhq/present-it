import axios from 'axios'
import { useContext } from 'react';
import { themes } from 'src/components/ThemeSelector';
import { AIContext } from 'src/contexts/AIContextProvider';

const baseURL = 'https://present-it-backend-5tvmeuqeua-de.a.run.app'

const useAPI = () => {
  const { theme, prompt, genre, selectedNarrator, totalSlides } =
    useContext(AIContext);

  const generate = async (
    currentSlide = 0,
    previousSlidesSummaries = ""
  ) => {
    const data = JSON.stringify({
      topic: prompt,
      color_scheme: themes[theme].join(','),
      target_audience: genre,
      total_slides: totalSlides,
      current_slide_number: currentSlide,
      previous_slides_summaries: previousSlidesSummaries
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/openai/generate',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'application/json'
      },
      data
    };

    console.log(data)

    let resp: {
      data: {
        title: string;
        subtitle: string;
        content: string;
        bullet_points: string[];
        summary: string;
        image_generation_prompt: string;
        speaker_note: string;
      }
    }

    for (let i = 0; i < 10; i++) {
      resp = await axios.request(config).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      })

      if (resp?.data?.title) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return resp.data
      }
    }

    throw new Error('Failed to generate slide')
  }

  const generateImage = async (prompt = "") => {
    const data = JSON.stringify({
      image_generation_prompt: prompt
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/generate/image',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'application/json'
      },
      data
    };

    console.log(data)

    let resp: {
      data: {
        image_public_url: string;
        image_generation_prompt: string;
      }
    }

    for (let i = 0; i < 10; i++) {
      resp = await axios.request(config).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      })

      if (resp?.data?.image_public_url) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return resp.data
      }
    }

    throw new Error('Failed to generate image')
  }

  const generateNarration = async (prompt = "") => {
    const data = JSON.stringify({
      audio_generation_prompt: prompt,
      audio_voice: selectedNarrator,
      pitch: 1,
      speed: 0.4
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/generate/audio',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'application/json'
      },
      data
    };

    console.log(data)

    let resp: {
      data: {
        audio_generation_prompt: string;
        audio_voice: string;
        audio_public_url: string;
        audio_length_in_sec: number;
        pitch: number;
        speed: number;
      }
    }

    for (let i = 0; i < 10; i++) {
      resp = await axios.request(config).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      })

      if (resp?.data?.audio_public_url) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return resp.data
      }
    }

    throw new Error('Failed to generate narration')
  }

  return { generate, generateImage, generateNarration }
}

export default useAPI