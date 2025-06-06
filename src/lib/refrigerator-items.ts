import { generateGridArray } from "./utils";

export interface IItem {
  id: string;
  name: string;
  image: string;
  totalQty: number;
  blockWidth: number;
  blockHeight: number;
  placementAmount: number;
  placementSet: "horizontal" | "vertical";
  category: string;
  dock: "top" | "bottom";
  rack: TRack;
}

export interface IItemPlaced
  extends Pick<IItem, "id" | "name" | "image" | "blockWidth" | "blockHeight"> {
  amount: number;
  rack: TRack;
  dock: "top" | "bottom";
  position?: {
    row: number;
    col: number;
  };
}

export interface IRackArea {
  area: TRack;
  areaId: TAreaId;
  className: string;
  items: IItemPlaced[][];
  name: string;
  columns: number;
  rows: number;
}

export type TRack =
  | "top-middle-door"
  | "top-door"
  | "middle-rack"
  | "freezer"
  | "freezer-bottom";

export type TAreaId =
  | "top-left"
  | "top-middle1"
  | "top-middle2"
  | "top-middle3"
  | "top-middle4"
  | "top-right"
  | "middle-left"
  | "middle-right"
  | "bottom-left"
  | "bottom-right"
  | "freezer-left"
  | "freezer-right"
  | "freezer-sec2-left"
  | "freezer-sec2-right";

const refrigeratorItems: IItem[] = [
  {
    id: "telur",
    name: "Telur",
    blockWidth: 2,
    blockHeight: 3,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 3,
    category: "Food",
    image: "/items/egg-front-view.webp",
    dock: "top",
    rack: "top-middle-door",
  },
  {
    id: "puding",
    name: "Puding",
    blockWidth: 3,
    blockHeight: 3,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 2,
    category: "Food",
    image: "/items/pudding-front-view.webp",
    dock: "bottom",
    rack: "top-middle-door",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 3,
    totalQty: 12,
    category: "Food",
    image: "/items/strawberry-front-view.webp",
    dock: "top",
    rack: "top-middle-door",
  },
  {
    id: "pisang",
    name: "Pisang",
    blockWidth: 1,
    blockHeight: 3,
    placementSet: "vertical",
    placementAmount: 1,
    totalQty: 6,
    category: "Food",
    image: "/items/banana-front-view.webp",
    dock: "bottom",
    rack: "top-middle-door",
  },
  {
    id: "brownies",
    name: "Brownies",
    blockWidth: 3,
    blockHeight: 2,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 3,
    category: "Food",
    image: "/items/brownie-front-view.webp",
    dock: "top",
    rack: "top-middle-door",
  },
  {
    id: "cheese",
    name: "Cheese",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 3,
    totalQty: 12,
    category: "Food",
    image: "/items/cheese-front-view.webp",
    dock: "bottom",
    rack: "top-middle-door",
  },
  {
    id: "roti_tawar",
    name: "Roti Tawar",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 3,
    totalQty: 6,
    category: "Food",
    image: "/items/bread-front-view.webp",
    dock: "top",
    rack: "top-middle-door",
  },
  {
    id: "wortel",
    name: "Wortel",
    blockWidth: 1,
    blockHeight: 2,
    placementSet: "vertical",
    placementAmount: 4,
    totalQty: 8,
    category: "Food",
    image: "/items/carrot-front-view.webp",
    dock: "bottom",
    rack: "middle-rack",
  },
  {
    id: "kentang",
    name: "Kentang",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 4,
    totalQty: 8,
    category: "Food",
    image: "/items/potato-front-view.webp",
    dock: "top",
    rack: "middle-rack",
  },
  {
    id: "tomat",
    name: "Tomat",
    blockWidth: 1,
    blockHeight: 2,
    placementSet: "vertical",
    placementAmount: 4,
    totalQty: 8,
    category: "Food",
    image: "/items/tomato-front-view.webp",
    dock: "bottom",
    rack: "middle-rack",
  },
  {
    id: "botol",
    name: "Botol",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 10,
    category: "Drink",
    image: "/items/bottle-front-view.webp",
    dock: "top",
    rack: "top-door",
  },
  {
    id: "susu_karton",
    name: "Susu Karton",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 6,
    category: "Drink",
    image: "/items/milk-front-view.webp",
    dock: "bottom",
    rack: "top-door",
  },
  {
    id: "toples",
    name: "Toples",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 1,
    totalQty: 8,
    category: "Food",
    image: "/items/jar-front-view.webp",
    dock: "top",
    rack: "top-door",
  },
  {
    id: "ice_cream",
    name: "Ice Cream",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 4,
    totalQty: 8,
    category: "Drink",
    image: "/items/ice-cream-front-view.webp",
    dock: "bottom",
    rack: "freezer",
  },
  {
    id: "mochi_ice_cream",
    name: "Mochi Ice Cream",
    blockWidth: 1,
    blockHeight: 2,
    placementSet: "vertical",
    placementAmount: 4,
    totalQty: 8,
    category: "Drink",
    image: "/items/ice-mochi-front-view.webp",
    dock: "top",
    rack: "freezer",
  },
  {
    id: "dumpling",
    name: "Dumpling",
    blockWidth: 1,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 4,
    totalQty: 8,
    category: "Food",
    image: "/items/dumpling-front-view.webp",
    dock: "top",
    rack: "freezer",
  },
  {
    id: "ayam",
    name: "Ayam",
    blockWidth: 2,
    blockHeight: 2,
    placementSet: "horizontal",
    placementAmount: 4,
    totalQty: 12,
    category: "Food",
    image: "/items/chicken-front-view.webp",
    dock: "top",
    rack: "freezer",
  },
  {
    id: "sosis",
    name: "Sosis",
    blockWidth: 1,
    blockHeight: 2,
    placementSet: "vertical",
    placementAmount: 4,
    totalQty: 12,
    category: "Food",
    image: "/items/sausage-front-view.webp",
    dock: "bottom",
    rack: "freezer",
  },
  {
    id: "ikan",
    name: "Ikan",
    blockWidth: 1,
    blockHeight: 3,
    placementSet: "vertical",
    placementAmount: 3,
    totalQty: 3,
    category: "Food",
    image: "/items/fish-front-view.webp",
    dock: "bottom",
    rack: "freezer-bottom",
  },
  {
    id: "daging",
    name: "Daging",
    blockWidth: 3,
    blockHeight: 1,
    placementSet: "horizontal",
    placementAmount: 3,
    totalQty: 3,
    category: "Food",
    image: "/items/meat-front-view.webp",
    dock: "top",
    rack: "freezer-bottom",
  },
];

export const rackArea: IRackArea[] = [
  {
    area: "top-door",
    areaId: "top-left",
    className: "gs-mask-door-dashed door-left",
    // items: Array.from({ length: 3 }, () => Array(4).fill(null)),
    items: generateGridArray(3, 4),
    columns: 4,
    rows: 3,
    name: "Pintu Kulkas",
  },
  {
    area: "top-middle-door",
    areaId: "top-middle1",
    className: "gs-mask-door-dashed door-middle",
    // items: Array.from({ length: 4 }, () => Array(6).fill(null)),
    items: generateGridArray(4, 6),
    columns: 6,
    rows: 4,
    name: "Rak Utama",
  },
  {
    area: "top-door",
    areaId: "top-right",
    className: "gs-mask-door-dashed door-right",
    // items: Array.from({ length: 3 }, () => Array(4).fill(null)),
    items: generateGridArray(3, 4),
    columns: 4,
    rows: 3,
    name: "Pintu Kulkas",
  },
  {
    area: "middle-rack",
    areaId: "middle-left",
    className: "gs-mask-door-dashed-middle door-left",
    // items: Array.from({ length: 1 }, () => Array(4).fill(null)),
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Drawer Atas",
  },
  {
    area: "middle-rack",
    areaId: "middle-right",
    className: "gs-mask-door-dashed-middle door-right",
    // items: Array.from({ length: 1 }, () => Array(4).fill(null)),
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Drawer Bawah",
  },
  {
    area: "freezer",
    areaId: "bottom-left",
    className: "gs-mask-door-dashed-bottom left",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 1",
  },
  {
    area: "freezer",
    areaId: "bottom-right",
    className: "gs-mask-door-dashed-bottom right",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 2",
  },
  {
    area: "freezer",
    areaId: "freezer-left",
    className: "gs-mask-door-dashed-freezerbottom left",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 3",
  },
  {
    area: "freezer",
    areaId: "freezer-right",
    className: "gs-mask-door-dashed-freezerbottom right",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 4",
  },
  {
    area: "freezer-bottom",
    areaId: "freezer-sec2-left",
    className: "gs-mask-door-dashed-freezerbottom sec2 left",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 5",
  },
  {
    area: "freezer-bottom",
    areaId: "freezer-sec2-right",
    className: "gs-mask-door-dashed-freezerbottom sec2 right",
    items: generateGridArray(1, 3),
    columns: 4,
    rows: 1,
    name: "Freezer 6",
  },
];

export default refrigeratorItems;
