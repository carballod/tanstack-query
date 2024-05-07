import { useEffect, useReducer, useState } from "react";
import "./App.css";

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );

  const numberString = await res.text();

  // throw new Error("Error!!!");
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setisLoading(true);

    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setisLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setisLoading(false);
  }, [error]);

  return (
    <div className="App App-Header">
      {isLoading ? <h2>Cargando...</h2> : <h2>Numero aleatorio: {number}</h2>}

      {!isLoading && error && <h2>{error}</h2>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? "..." : "Nuevo numero"}
      </button>
    </div>
  );
};
