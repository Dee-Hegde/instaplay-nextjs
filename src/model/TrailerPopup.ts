export interface Trailer {
  id: number;
  results: TrailerData[];
}

export interface TrailerData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface PopupModel {
  videoDetails: TrailerData | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
