import { create } from "zustand";

const useSearchStore = create((set) => ({
  songs: [],
  searchTerm: "",
  relatedSongs: [],
  currentSong: {},
  setRelatedSongs: (relatedSongs) => set({ relatedSongs }),
  setSongs: (songs) => set({ songs }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCurrentSong: (currentSong) => set({ currentSong }),
}));

export { useSearchStore };
