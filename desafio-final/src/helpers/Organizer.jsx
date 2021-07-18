import { formataTexto } from "./helpers";

export function formataInfo(children) {
  const partidas = children.partidas;

  const visitantesScore = Object.keys(partidas).map(
    (i) => partidas[i].pontuacao_geral_visitante
  );
  const visitantesName = Object.keys(partidas).map(
    (i) => partidas[i].visitante
  );
  const mandanteScore = Object.keys(partidas).map(
    (i) => partidas[i].pontuacao_geral_mandante
  );
  const mandanteName = Object.keys(partidas).map((i) => partidas[i].mandante);

  for (var i = 0; i < visitantesScore.length; i++) {
    const newName = "nome";
    const urlName = "urlNome";
    const newValue = visitantesName[i];
    const newUrlValue = formataTexto(visitantesName[i]);
    visitantesScore[i][newName] = newValue;
    visitantesScore[i][urlName] = newUrlValue;

    const newValue2 = mandanteName[i];
    const newUrlValue2 = formataTexto(mandanteName[i]);
    mandanteScore[i][newName] = newValue2;
    mandanteScore[i][urlName] = newUrlValue2;
  }

  const data = visitantesScore.concat(mandanteScore);

  const ordenedData = data.sort((a, b) => {
    if (a.total_pontos > b.total_pontos) return -1;
    if (a.total_pontos < b.total_pontos) return 1;
    return 0;
  });
  return ordenedData;
}
