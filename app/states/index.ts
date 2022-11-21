import { atom } from "recoil";

import { Planet } from "./types";

const atomNextPage = atom<string>({
  key: "planetNextPage",
  default: "https://swapi.dev/api/planets/?page=1",
});

const atomPlanets = atom<Planet[]>({
  key: "atomPlanets",
  default: [],
});

export { atomPlanets, atomNextPage };
