import ExpensesPage from "./pages/ExpensesPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const currentMonth = getCurrentMonth();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/despesas/:mes">
          <ExpensesPage />
        </Route>
        <Redirect to={{pathname: "/despesas/" + currentMonth}}/>
      </Switch>
    </BrowserRouter>
  );
}

function getCurrentMonth(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${String(month).padStart(2, "0")}`
}

export default App;
