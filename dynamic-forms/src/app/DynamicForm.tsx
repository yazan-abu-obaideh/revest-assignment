"use client";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { ElementData, FormDescription } from "./FormData";

function parseFormElement(
  elementData: ElementData,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
) {
  switch (elementData.fieldType) {
    case "TEXT":
      return (
        <TextFormElement
          errors={errors}
          register={register}
          elementData={elementData}
        />
      );
    case "LIST":
      return (
        <ListFormElement
          errors={errors}
          register={register}
          elementData={elementData}
        />
      );
    case "RADIO":
      return (
        <RadioFormElement
          errors={errors}
          elementData={elementData}
          register={register}
        />
      );
    default:
      return <>Unknown form element</>;
  }
}

const ListFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = (props) => {
  const options = props.elementData.listOfValues1 || [];
  const fallBack = <> No options provided for list element </>;

  return options.length === 0 ? (
    fallBack
  ) : (
    <>
      <FormLabel style={{ marginRight: "5%" }}>
        {props.elementData.name}
      </FormLabel>
      <Select
        {...props.register(props.elementData.name, {
          required: props.elementData.required,
        })}
        name={props.elementData.name}
        defaultValue={
          options[Number.parseInt(props.elementData.defaultValue) - 1]
        }
      >
        {["None", ...options].map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

const RadioFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = (props) => {
  const radioOptions = props.elementData.listOfValues1 ?? [];
  return (
    <FormControl required={props.elementData.required}>
      <FormLabel> {props.elementData.name} </FormLabel>
      <RadioGroup
        name={props.elementData.name}
        defaultValue={props.elementData.defaultValue}
      >
        {radioOptions.map((option, index) => {
          const value = (index + 1).toString();
          return (
            <FormControlLabel
              key={option}
              value={value}
              control={
                <Radio
                  {...props.register(props.elementData.name, {
                    required: props.elementData.required,
                  })}
                />
              }
              label={option}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const TextFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = (props) => {
  const minLength = props.elementData.minLength ?? 0;
  const maxLength = props.elementData.maxLength ?? 1000;
  const data = props.elementData;
  const name = data.name;
  return (
    <TextField
      {...props.register(name, {
        required: data.required,
        minLength: {
          value: minLength,
          message: `'${name}' must have a length exceeding ${minLength}`,
        },
        maxLength: {
          value: maxLength,
          message: `'${name}' must have a length smaller than ${maxLength}`,
        },
      })}
      label={name}
      required={data.required}
      name={name}
      defaultValue={data.defaultValue}
      error={props.errors[name] !== undefined}
      helperText={props.errors[name]?.message?.toString()}
      sx={
        {
          width: "100%"
        }
      }
      type="text"
    />
  );
};

export const DynamicForm: React.FC<{ formDesc: FormDescription }> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box sx={
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20%"
      }
    }>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Stack width="100%" spacing={2}>
          {props.formDesc.data.map((elementData) => (
            <div key={elementData.id}>
              {parseFormElement(elementData, register, errors)}
            </div>
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
