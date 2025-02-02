import { FormDescription } from "./FormData";

export abstract class UserDataStore {
  abstract hasUser(userId: string): boolean
  abstract createUser(userId: string): void
  abstract fetchUserData(userId: string): FormDescription[];
  abstract addData(userId: string, newData: FormDescription): void;
}

