import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
type PropsType = {
  label: string;
  options: string[];
  getSelectedOption: (option: string) => void;
  value: string;
};
export default function FlatSelect({
  options,
  label,
  getSelectedOption,
  value,
}: PropsType) {
  return (
    <FormControl fullWidth>
      <InputLabel id="">{label}</InputLabel>
      <Select
        labelId=""
        id=""
        value={value}
        label={label}
        onChange={(e) => {
          getSelectedOption(e.target?.value?.toString().toLowerCase());
        }}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
