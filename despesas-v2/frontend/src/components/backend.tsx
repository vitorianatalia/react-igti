export interface IExpenses {
  id: number, 
  descricao: string, 
  categoria: string, 
  valor: number, 
  mes: string,
  dia: string
}

export function getExpensesEndpoint(mes: string): Promise<IExpenses[]> {
  const response = fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`).then((resp) => {
      return resp.json();
    });
  return response;
}
