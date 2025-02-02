import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container } from "@mui/material";
import { INSTANCE } from "./LocalUserDataStore";
import { FormDescription } from "./FormData";

type FormFields = {
  newFromDescription: string;
  formLabel: string;
};

const NewFormInput: React.FC<{
  userId: string;
  setUserData: (newData: FormDescription[]) => void;
}> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    INSTANCE.addData(props.userId, {
      formLabel: data.formLabel,
      data: JSON.parse(data.newFromDescription).data,
    });
    props.setUserData(INSTANCE.fetchUserData(props.userId));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("formLabel")} label="Form Name" fullWidth />
        <TextField
          label="Form Description"
          multiline
          rows={6}
          variant="outlined"
          fullWidth
          {...register("newFromDescription", {
            required: "This field is required",
          })}
          error={!!errors.newFromDescription}
          helperText={
            errors.newFromDescription
              ? errors.newFromDescription.message?.toString()
              : ""
          }
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add form
        </Button>
      </form>
    </Container>
  );
};

export default NewFormInput;
