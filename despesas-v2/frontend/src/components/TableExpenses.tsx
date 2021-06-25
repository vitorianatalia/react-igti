import TableCell from '@material-ui/core/TableCell';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

import { IExpenses } from "./backend";

interface IProps extends React.HTMLAttributes<Element> {
  expenses: IExpenses[];
}

export default function Main(props: IProps) {

  return (
    <TableBody>
      {props.expenses.map(({ id, descricao, categoria, dia, valor }) => {
        return (
          
            <TableRow key={id}>
              <TableCell>{descricao}</TableCell>
              <TableCell>{categoria}</TableCell>
              <TableCell align="right">{dia}</TableCell>
              <TableCell align="right">{valor}</TableCell>
            </TableRow>
                         
        );
      })}
    </TableBody>
  );
}
