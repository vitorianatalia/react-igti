import TableRow from "./TableRow";
import { formataInfo } from "../helpers/Organizer";

export default function Table({ children }) {
  const ordenedData = formataInfo(children);

  return (
    <div className="flex flex-row items-center justify-center mt-3 flex-wrap">
      <table v-for="item in items" className="table-fixed">
        <thead>
          <tr>
            <th className="p-3 text-center"></th>
            <th className="p-3 text-center"></th>
            <th className="p-3 text-center"></th>
            <th className="p-3 text-center">T</th>
            <th className="p-3 text-center">V</th>
            <th className="p-3 text-center">E</th>
            <th className="p-3 text-center">D</th>
            <th className="p-3 text-center">GP</th>
            <th className="p-3 text-center">GC</th>
            <th className="p-3 text-center">S</th>
          </tr>
        </thead>

        <tbody>
          {ordenedData.map((score, id) => {
            const imageUrl = `./img/${score.urlNome}.png`;
            return (
              <TableRow key={id} id={id} imageUrl={imageUrl}>
                {score}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
