"use client";
import { useState } from "react";
import { DynamicForm } from "./DynamicForm";
import styles from "./page.module.css";
import { ASSIGNMENT_SAMPLE_DATA } from "./sample_data";

const INITIAL_INPUT = JSON.stringify(ASSIGNMENT_SAMPLE_DATA);

const FormManipulator: React.FC<{
  setFormDesc: (formDesc: string) => void;
}> = (props) => {
  const [value, setValue] = useState(INITIAL_INPUT);

  return (
    <>
      <input
        style={{
          width: "50vw",
          height: "25vh",
        }}
        type="text"
        value={value}
        onChange={(event) => {
          event.stopPropagation();
          console.log("Changed the value!");
          setValue(event.currentTarget.value);
          props.setFormDesc(event.currentTarget.value);
        }}
      ></input>
    </>
  );
};

export default function Home() {
  const [formDesc, setFormDesc] = useState(INITIAL_INPUT);
  return (
    <div className={styles.page}>
      <DynamicForm formDesc={formDesc} />
      <FormManipulator setFormDesc={setFormDesc} />
    </div>
  );
}
