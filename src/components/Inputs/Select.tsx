type Value = string | number | readonly string[] | undefined;

type SelectOption = {
  value: Value;
  text?: string;
};

interface ISelect {
  value: Value;
  onChange: (selected: string) => void; // eslint-disable-line
  options: SelectOption[];
}

export default function Select({ value, onChange, options }: ISelect) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full cursor-pointer rounded-lg border bg-blue-950 p-2.5 text-sm text-white dark:bg-blue-200 dark:text-black"
    >
      {options.map((option: SelectOption, index: number) => (
        <option key={index} value={option.value}>
          {option.text ?? option.value}
        </option>
      ))}
    </select>
  );
}
