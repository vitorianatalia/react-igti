import Reports from "./Reports";

export default function Fundo({ description, children: reports }) {
  const ordernedReports = reports.sort((a, b) => {
    if (a.month > b.month) return 1;
    if (a.month < b.month) return -1;
    return 0;
  });

  function calcPercent(finalValue, initialValue) {
    return (finalValue / initialValue - 1) * 100;
  }

  const newOrdernedReports = ordernedReports.map((or, index) => {
    if (index === 0) return { ...or, percent: 0 };
    else {
      let afterValue = parseFloat(ordernedReports[index - 1].value);
      let percent = calcPercent(parseFloat(or.value), afterValue);
      return { ...or, percent: percent };
    }
  });

  const lastReport = newOrdernedReports[ordernedReports.length - 1];
  const firstReport = newOrdernedReports[0];
  const totalPercent = calcPercent(lastReport.value, firstReport.value);
  const total = (lastReport.value - firstReport.value).toLocaleString("pt", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="mb-6 mt-6 divide-y p-2 max-w-screen-md mx-auto text-center bg-gray-100 font-serif">
      <div className="mb-3">
        <p className="text-2xl">{description}</p>
        <p>
          Rendimento total: {total} ({totalPercent.toFixed(2)}%)
        </p>
      </div>
      <div className="divide-y divide-light-blue-400">
        {newOrdernedReports.map((report) => {
          return <Reports key={report.id}>{report}</Reports>;
        })}
      </div>
    </div>
  );
}
