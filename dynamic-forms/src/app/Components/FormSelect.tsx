import { FormLabel, MenuItem, Select } from "@mui/material";
import { FormDescription } from "../FormData";

export function FormSelect(props: {
  formOptions: FormDescription[];
  setFormDesc: React.Dispatch<React.SetStateAction<FormDescription>>;
}) {
  return (
    <>
      <FormLabel style={{ padding: "0.5%" }}>Selected Form</FormLabel>
      <Select name={"Select form"} defaultValue={0}>
        {props.formOptions.map((option, index) => {
          return (
            <MenuItem
              onClick={() => props.setFormDesc(option)}
              key={index}
              value={index}
            >
              {option.formLabel}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
