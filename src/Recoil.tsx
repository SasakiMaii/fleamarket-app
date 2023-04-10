import { atom } from "recoil";
import { Likes } from "./types/type";

// likeテーブル取得
export const likesState = atom<Likes[]>({
  key: 'likesState',
  default: [],
});