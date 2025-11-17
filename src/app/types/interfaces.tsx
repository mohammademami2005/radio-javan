export interface HomeSliderProps {
  id: number;
  name: string;
  avatar: string;
}


export interface AudioFromStore {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  duration: number;
  category: string;
  new:boolean;
  url: string;
  cover?: string;
}


export interface TracksState {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  src: string;
  cover: string;
  new: boolean;
  length: number;
}