import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);



export default function SelectMonth( yearMonth: string ) {
 
  console.log(yearMonth.toString())
  const [year, month] = yearMonth.split("-");
  console.log(year);
  // console.log(month)
  
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Mês</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <option value={1}>option 1</option>
          <option value={2}>option 2</option>
          <option value={3}>option 3</option>
          <option value={4}>option 4</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Ano</InputLabel>
        <Select value={0} native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <option value={1}>2020</option>
          <option value={2}>2021</option>
        </Select>
      </FormControl>
    </div>
  );
}
