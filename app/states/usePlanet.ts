import fetcher from "@app/utils/fetcher";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { atomNextPage, atomPlanets } from ".";
import { ResponsePlanet } from "./types";

interface IGetPlanet {
  url: string;
}

const getData = async ({ url }: IGetPlanet) => {
  const response = await fetcher<ResponsePlanet>(url);
  return response;
};

const usePlanet = () => {
  const [planet, setPlanet] = useRecoilState(atomPlanets);
  const [nextPage, setNextPage] = useRecoilState(atomNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMore();
  }, []);

  const fetchMore = async () => {
    if (!nextPage) return;
    setIsLoading(true);
    try {
      await getData({ url: nextPage }).then((response) => {
        setIsError(false);
        setPlanet([...planet, ...response.results]);
        setNextPage(response.next);
        setIsLoading(false);
      });
    } catch (err) {
      setErrorMessage(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    planet,
    isError,
    errorMessage,
    isLoading,
    fetchMore,
  };
};

export default usePlanet;
