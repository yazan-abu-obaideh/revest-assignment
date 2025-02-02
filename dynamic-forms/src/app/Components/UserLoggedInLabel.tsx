export function UserLoggedInLabel(props: { userId: string }) {
  return (
    <span
      style={{ opacity: "0.5", margin: "0.5%" }}
    >{`Logged in as: ${props.userId}`}</span>
  );
}
