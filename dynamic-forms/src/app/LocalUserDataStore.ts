import { FormDescription } from "./FormData";
import { UserDataStore } from "./UserDataStore";

const USER_DATA = new Map<string, FormDescription[]>();

class LocalUserDataStore extends UserDataStore {
  hasUser(userId: string): boolean {
      return USER_DATA.has(userId);
  }
  createUser(userId: string): void {
      USER_DATA.set(userId, []);
  }
  fetchUserData(userId: string): FormDescription[] {
    return USER_DATA.get(userId) ?? [];
  }

  addData(userId: string, newData: FormDescription): void {
    if (!USER_DATA.has(userId)) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
    const oldData = USER_DATA.get(userId) ?? [];
    USER_DATA.set(userId, [...oldData, newData]);
  }
}

export const INSTANCE = new LocalUserDataStore();
