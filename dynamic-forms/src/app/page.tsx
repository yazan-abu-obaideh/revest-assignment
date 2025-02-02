"use client";
import React, { useEffect, useState } from "react";
import { DynamicForm } from "./Components/DynamicForm";
import { ASSIGNMENT_SAMPLE_DATA } from "./SampleData";
import NewFormInput from "./Components/NewFormInput";
import { INSTANCE } from "./LocalUserDataStore";
import { FormDescription } from "./FormData";
import { FormSelect } from "./Components/FormSelect";
import { SimpleLogin } from "./Components/SimpleLogin";
import { Header } from "./Components/Header";
import { CenteredStack, SubtleSeparator } from "./Components/Utils";
import { UserLoggedInLabel } from "./Components/UserLoggedInLabel";

export default function Home() {
  const [formDesc, setFormDesc] = useState(ASSIGNMENT_SAMPLE_DATA);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<FormDescription[]>([
    ASSIGNMENT_SAMPLE_DATA,
  ]);

  useEffect(() => {
    setUserData(INSTANCE.fetchUserData(userId ?? ""));
    setFormDesc(ASSIGNMENT_SAMPLE_DATA);
  }, [userId]);

  const withSample = [ASSIGNMENT_SAMPLE_DATA, ...userData];

  return (
    <div>
      <Header
        showLogout={userId !== undefined}
        doLogout={() => setUserId(undefined)}
      />
      {!userId && <SimpleLogin setUserId={setUserId} />}
      {userId && (
        <>
          <CenteredStack>
            <UserLoggedInLabel userId={userId} />
            <FormSelect formOptions={withSample} setFormDesc={setFormDesc} />
          </CenteredStack>
          <SubtleSeparator />
          <CenteredStack>
            <DynamicForm formDesc={formDesc} />
          </CenteredStack>
          <SubtleSeparator />
          <NewFormInput userId={userId} setUserData={setUserData} />
        </>
      )}
    </div>
  );
}
