import { create } from "zustand";

const useSearchStore = create((set) => ({
  songs: [],
  videoDetails: {},
  searchTerm: "",
  relatedSongs: [],
  currentSong: {},
  setRelatedSongs: (relatedSongs) => set({ relatedSongs }),
  setSongs: (songs) => set({ songs }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCurrentSong: async (currentSong) => {
    set({ currentSong });
  },
  setVideoDetails: (videoDetails) => set({ videoDetails }),
}));

export const fetchRelatedSongs = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/getvideo/` + id
    );
    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRelatedSongsV2 = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/related/` + id
    );
    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { useSearchStore };
