
import Fundo from "./components/Fundo.jsx";
import Header from "./components/Header.jsx";
import { data } from "./data/investments.js";

export default function App() {
  const allInvestments = data[0].investments;
  const allReports = data[0].reports;

  return (
    <>
     <Header/>

     <main className="container-lg">
       {allInvestments.map((investment) => {
         const reports = allReports.filter(rep => rep.investmentId === investment.id);

         return <Fundo key={investment.id} description={investment.description}>{reports}</Fundo>
       })}
     </main>
    </>
  );
}
