export default function Select({
  children: options = [
    { id: "01", description: "Opcao 1" },
    { id: "02", description: "Opcao 2" },
  ],
  selectValue = "a1",
  onSelectedChange = null,
}) {
  function HandleSelectedChange({ currentTarget }) {
    if (onSelectedChange) {
      const newValue = currentTarget.value;
      onSelectedChange(newValue);
    }
  }

  return (
    <>
      <select
        className="shadow-md rounded-sm pt-2 pl-3 pb-2 pr-3"
        value={selectValue}
        onChange={HandleSelectedChange}
      >
        {options.map(({ id, description }) => {
          return (
            <option key={id} value={description}>
              {description}
            </option>
          );
        })}
      </select>
    </>
  );
}
