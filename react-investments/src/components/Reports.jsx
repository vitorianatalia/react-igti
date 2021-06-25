export default function Reports({
  description,
  children: reports
  
}) {
  const months = [
    "jan",
    "feb",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const month = reports.month;
  const year = reports.year;
  const percent = reports.percent.toFixed(2);
  const bgColor = (reports.percent > 0 ? "text-green-400" : reports.percent < 0 ? "text-red-400" : "");

  const strPercent = percent > 0 ? "+"+ percent : percent;



  return (
    <div className="flex flex-row items-center w-50">
      <p>{description}</p>

      <p className="w-1/4 text-left">
        {months[month - 1]}/{year}
      </p>
      <p className={"w-1/2 "+bgColor}>
        {reports.value.toLocaleString("pt", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p className={"w-1/4 text-right items-right  " +bgColor}>{strPercent}%</p>
    </div>
  );
}

