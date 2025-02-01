import { DynamicForm } from "./DynamicForm";
import styles from "./page.module.css";

export default function Home() {
  
  return (
    <div className={styles.page}>
      <DynamicForm />
    </div>
  );
}
