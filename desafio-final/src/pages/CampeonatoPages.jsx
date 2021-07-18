import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import Select from "../components/Select";
import { apiGetAllMatches } from "../services/apiService";
import Table from "../components/Table";

const YEARS = [
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
];

function Loading() {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}

export default function CampeonatoPages() {
  const [loadingPage, setLoading] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [year, setYear] = useState([]);

  const [allMatches, setAllMatches] = useState([]);
  const [lastRound, setLastRound] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    setYear(YEARS);
    setSelectedYear(YEARS[0]);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!selectedYear) {
      return;
    }

    async function getYear() {
      const allMatches = await apiGetAllMatches(selectedYear);
      setAllMatches(allMatches);

      setLastRound(allMatches[allMatches.length - 1]);

      setTimeout(() => {
        setLoadingMatches(false);
      }, 500);
    }
    getYear();
  }, [selectedYear]);

  function handleYearChange(newYear) {
    setSelectedYear(newYear);
  }

  let mainJsx = <Loading />;
  if (!loadingPage) {
    mainJsx = (
      <div>
        <div className="text-center">
          <h1 className="font-bold text-xl mb-4">
            Campeonato Brasileirão de {selectedYear}
          </h1>
          <Select
            selectValue={selectedYear}
            onSelectedChange={handleYearChange}
          >
            {year.map((year, index) => ({
              index,
              description: year,
              key: selectedYear,
            }))}
          </Select>
        </div>
        <div>{loadingMatches ? <Loading /> : <Table>{lastRound}</Table>}</div>
      </div>
    );
  }

  return (
    <div>
      <Header>react-campeonato-brasileiro</Header>

      <main>
        <div className="container mx-auto p-4">{mainJsx}</div>
      </main>
    </div>
  );
}
