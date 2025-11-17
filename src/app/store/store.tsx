import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioState {
  audio: {
    id: number;
    title: string;
    artistId: number;
    albumId: number;
    src: string;
    cover: string;
    new: boolean;
    length: number;
  };
  setAudio: (
    id: number,
    title: string,
    artistId: number,
    albumId: number,
    src: string,
    cover: string,
    newValue: boolean,
    length: number
  ) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      audio: {
        id: 0,
        title: "",
        artistId: 0,
        albumId: 0,
        src: "",
        cover: "",
        new: false,
        length: 0,
      },
      setAudio: (id, title, artistId, albumId, src, cover, newValue, length) =>
        set((state) => ({
          audio: {
            id,
            title,
            artistId,
            albumId,
            src,
            cover,
            new: newValue,
            length,
          },
        })),
    }),
    {
      name: "audio",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
