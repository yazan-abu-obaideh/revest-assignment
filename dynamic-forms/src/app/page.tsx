"use client";
import React, { useEffect, useState } from "react";
import { DynamicForm } from "./DynamicForm";
import { ASSIGNMENT_SAMPLE_DATA } from "./sample_data";
import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import NewFormInput from "./NewFormInput";
import { INSTANCE } from "./LocalUserDataStore";
import { FormDescription } from "./FormData";

type SimpleLoginFieldValues = {
  UserId: string;
};

const Header: React.FC<{
  showLogout: boolean;
  doLogout: () => void;
}> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <AppBar color="secondary" position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Revest Dynamic Forms
          </Typography>
          {props.showLogout && (
            <Button onClick={props.doLogout} color="inherit">
              Logout
            </Button>
          )}
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
          <TextField {...register("UserId")} label={"User ID"} />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Box>
  );
};

function SubtleSeparator() {
  return <hr style={{ width: "80%", height: "10%", opacity: "0.1" }}></hr>;
}

export default function Home() {
  const [formDesc, setFormDesc] = useState(ASSIGNMENT_SAMPLE_DATA);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<FormDescription[]>([
    ASSIGNMENT_SAMPLE_DATA,
  ]);
  const [showAddForm] = useState(true);

  useEffect(() => {
    setUserData(INSTANCE.fetchUserData(userId ?? ""));
  }, [userId]);

  return (
    <div>
      <Header
        showLogout={userId !== undefined}
        doLogout={() => setUserId(undefined)}
      />
      {!userId && <SimpleLogin setUserId={setUserId} />}
      {userId && userData.length > 0 && (
        <>
          <Stack
            width="100%"
            padding="0.5%"
            alignItems="center"
            justifyContent="center"
          >
            <span
              style={{ opacity: "0.5", margin: "0.5%" }}
            >{`Logged in as: ${userId}`}</span>
            <div style={{ padding: "0.5%" }}>Selected Form</div>
            <Select name={"Select form"} defaultValue={0}>
              {[ASSIGNMENT_SAMPLE_DATA, ...userData].map((option, index) => {
                return (
                  <MenuItem
                    onClick={() => setFormDesc(option)}
                    key={index}
                    value={index}
                  >
                    {option.formLabel}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
        </>
      )}

      {userId && (
        <>
          <SubtleSeparator />
          <Stack
            width="100%"
            padding="0.5%"
            alignItems="center"
            justifyContent="center"
          >
            <DynamicForm formDesc={formDesc} />
          </Stack>
          <SubtleSeparator />
        </>
      )}

      {userId && showAddForm && (
        <Box>
          <NewFormInput userId={userId} setUserData={setUserData} />
        </Box>
      )}
    </div>
  );
}
