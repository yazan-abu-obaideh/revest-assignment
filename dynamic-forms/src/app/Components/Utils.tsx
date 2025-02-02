import { Stack } from "@mui/material";
import { ReactNode } from "react";

export function SubtleSeparator() {
  return <hr style={{ width: "80%", height: "10%", opacity: "0.1" }}></hr>;
}

export const CenteredStack: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Stack
      width="100%"
      padding="0.5%"
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </Stack>
  );
};
