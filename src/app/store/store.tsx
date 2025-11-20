import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
    playState: boolean;
  setPlayState: (myState: boolean) => void;
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
      playState: false,
      setPlayState: (myState) => {
        set((state) => ({
          playState: myState,
        }));
      },
    }),
    {
      name: "audio",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => sessionStorage)
          : undefined,
    }
  )
);

interface PlayListItem {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  src: string;
  cover: string;
  new: boolean;
  length: number;
}

interface PlayListState {
  playList: PlayListItem[];
  setPlayList: (myArr: PlayListItem[]) => void;
}

export const playListStore = create<PlayListState>((set) => ({
  playList: [],
  setPlayList: (myArr) => {
    set((state) => ({
      playList: myArr,
    }));
  },
}));

interface SearchState{
  searchState: boolean,
  setSearchState: (newState:boolean)=> void
}

export const useSearchStore = create<SearchState>((set)=>({
    searchState: false,
    setSearchState: (newState)=>{
      set((state)=>({
        searchState:newState
      }))
    }
}))