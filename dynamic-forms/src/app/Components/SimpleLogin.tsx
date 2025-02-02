import { Box, Button, Stack, TextField } from "@mui/material";
import { INSTANCE } from "../LocalUserDataStore";
import { SubmitHandler, useForm } from "react-hook-form";

type SimpleLoginFieldValues = {
  UserId: string;
};

export const SimpleLogin: React.FC<{ setUserId: (userId: string) => void }> = (
  props
) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SimpleLoginFieldValues>();

  const onSubmit: SubmitHandler<SimpleLoginFieldValues> = (data) => {
    if (!INSTANCE.hasUser(data.UserId)) {
      INSTANCE.createUser(data.UserId);
    }
    props.setUserId(data.UserId);
  };
  return (
    <Box
      height="30vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextField
            {...register("UserId", {
              minLength: {
                value: 3,
                message: "User ID is too short",
              },
              required: true,
            })}
            label={"User ID"}
            error={errors.UserId !== undefined}
            helperText={errors.UserId?.message ?? ""}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Box>
  );
};
