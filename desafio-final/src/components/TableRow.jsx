export default function TableRow({ children, id, imageUrl }) {
  const saldo = children.total_gols_marcados - children.total_gols_sofridos;
  const nomeFormatado = children.nome
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  return (
    <tr className="odd:bg-gray-100">
      <td className="p-3 text-center">
        {(id + 1).toString().padStart(2, "0")}
      </td>
      <td>
        <img alt={children.nome} src={imageUrl} border={3} width={30} />
      </td>
      <td className="p-3 ">{nomeFormatado}</td>
      <td className="p-3 text-center">{children.total_pontos}</td>
      <td className="p-3 text-center">{children.total_vitorias}</td>
      <td className="p-3 text-center">{children.total_empates}</td>
      <td className="p-3 text-center">{children.total_derrotas}</td>
      <td className="p-3 text-center">{children.total_gols_marcados}</td>
      <td className="p-3 text-center">{children.total_gols_sofridos}</td>
      <td className="p-3 text-center">{saldo}</td>
    </tr>
  );
}
