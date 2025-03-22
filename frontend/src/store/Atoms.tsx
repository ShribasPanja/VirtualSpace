import { atom } from "recoil";

export const usersState = atom<{ id: string; position: number[] }[]>({
  key: "users",
  default: [],
});

type MapItem = {
  name: string;
  size: number[];
  gridPosition: number[];
  rotation: number;
};

export const mapState = atom<{
  size: number[];
  subdivisions: number;
  items: MapItem[];
}>({
  key: "map",
  default: {
    size: [0, 0],
    subdivisions: 0,
    items: [],
  },
});

export const itemsState = atom<{
  [key: string]: { name: string; size: number[] };
} | null>({
  key: "items",
  default: null,
});

export const idState = atom<string | null>({
  key: "id",
  default: null,
});
