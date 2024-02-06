import { create } from "zustand";
import { ChatProps } from "../pages/CodeGeneration";

interface useChatsProps {
  allChats: {
    codeChats: ChatProps[];
    imageChats: ChatProps[];
  };
  OnSetAllChats: (value: {
    codeChats: ChatProps[];
    imageChats: ChatProps[];
  }) => void;
  onAddCodeChat: (value: ChatProps[]) => void;
  onAddImageChat: (value: ChatProps[]) => void;
}
const useChats = create<useChatsProps>((set) => ({
  allChats: {
    codeChats: [{user:null,genius:null}],
    imageChats:[{user:null,genius:null}],
  },
  OnSetAllChats: (value) => set({ allChats: value }),
  onAddCodeChat: (value) =>
    set((state) => ({
      allChats: {
        ...state.allChats,
        codeChats: value,
      },
    })),
  onAddImageChat: (value) =>
    set((state) => ({
      allChats: {
        ...state.allChats,
        imageChats: value
      },
    })),
}));

export default useChats;
