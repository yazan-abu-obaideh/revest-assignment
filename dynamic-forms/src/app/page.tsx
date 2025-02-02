"use client";
import { useState } from "react";
import { DynamicForm } from "./DynamicForm";
import { ASSIGNMENT_SAMPLE_DATA } from "./sample_data";
import {
  AppBar,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const INITIAL_INPUT = JSON.stringify(ASSIGNMENT_SAMPLE_DATA);
const USER_ID = "USER_ID";

const USER_MAP = new Map<string, string[]>();

type SimpleLoginFieldValues = {
  UserId: string;
};

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <AppBar color="secondary" position="static" sx={{ width: "80%" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Revest Dynamic Forms
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const SimpleLogin: React.FC<{ setUserId: (userId: string) => void }> = (
  props
) => {
  const { handleSubmit, register } = useForm<SimpleLoginFieldValues>();

  const onSubmit: SubmitHandler<SimpleLoginFieldValues> = (data) => {
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
          <TextField {...register("UserId")} label={"User ID"} />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default function Home() {
  const [formDesc, setFormDesc] = useState(INITIAL_INPUT);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  return (
    <div>
      <Header />
      {!userId && <SimpleLogin setUserId={setUserId} />}
      {userId && (
        <Stack width="100%" padding="1%" alignItems="center" justifyContent="center">
            <span
              style={{ opacity: "0.5", padding: "1.5%" }}
            >{`Logged in as: ${userId}`}</span>
          <DynamicForm formDesc={formDesc} />
        </Stack>
      )}
    </div>
  );
}
