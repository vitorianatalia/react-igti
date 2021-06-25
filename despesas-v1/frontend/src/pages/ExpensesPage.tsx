import TableExpenses from "../components/TableExpenses";
import { getExpensesEndpoint, IExpenses } from "../components/backend";
import { useEffect } from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";

const MONTHS = [
  { valor: "01", nome: "Janeiro" },
  { valor: "02", nome: "Fevereiro" },
  { valor: "03", nome: "Março" },
  { valor: "04", nome: "Abril" },
  { valor: "05", nome: "Maio" },
  { valor: "06", nome: "Junho" },
  { valor: "07", nome: "Julho" },
  { valor: "08", nome: "Agosto" },
  { valor: "09", nome: "Setembro" },
  { valor: "10", nome: "Outubro" },
  { valor: "11", nome: "Novembro" },
  { valor: "12", nome: "Dezembro" },
];

export default function ExpensesPage() {
  const params = useParams<{ mes: string }>();
  const history = useHistory();
  const yearMonth = params.mes;
  const [year, month] = yearMonth.split("-");

  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  useEffect(() => {
    Promise.all([getExpensesEndpoint(yearMonth)]).then(([expenses]) => {
      setExpenses(expenses);
      return expenses;
    });
  }, [yearMonth]);

  let totalExpenses = 0;
  expenses.map(({ valor }) => {
    return (totalExpenses += valor);
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      div: {
        maxWidth: 650,
        margin: "0 auto",
      },

      total: {
        display: "flex",
        flexDirection: "row",
        textAlign: "right",
      },

      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    })
  );

  const classes = useStyles();

  function changeDate(year: string, month: string) {
    history.push(`/despesas/${year}-${month}`);

  }

  return (
    <div className={classes.div}>
      <Box component="div" className={classes.total}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Ano</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            onChange={(e) => changeDate(e.target.value as string, month)}
          >
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Mês</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={(e) => changeDate(year, e.target.value as string)}
          >
            {MONTHS.map((optionMonth) => (
              <MenuItem key={optionMonth.valor} value={optionMonth.valor}>{optionMonth.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <span>
          Despesa total: <strong>{totalExpenses.toFixed(2)}</strong>
        </span>
      </Box>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Despesa</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="right">Dia</TableCell>
              <TableCell align="right">Valor(R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableExpenses expenses={expenses} />
        </Table>
      </TableContainer>
    </div>
  );
}
