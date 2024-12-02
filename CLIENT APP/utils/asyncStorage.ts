import AsyncStorage from "@react-native-async-storage/async-storage";

type saveCredentialsProps = {
  email: string;
  password: string;
};

export async function setCredentials({
  email,
  password,
}: saveCredentialsProps) {
  try {
    // create new entry in async storage
    // this is executed when user is signed in

    await AsyncStorage.setItem(
      "userCredentials",
      JSON.stringify({ email, password })
    );

    console.log(setCredentials.name, "|", "credentials saved successfully");
  } catch (error) {
    console.error(setCredentials.name, "|", error);
  }
}

export async function getCredentials() {
  try {
    // returns the credentials from async storage
    // this is executed with persistence sign-in

    const value = await AsyncStorage.getItem("userCredentials");

    if (value !== null) {
      const { email, password } = JSON.parse(value);

      console.log(getCredentials.name, "|", "credentials found");
      return { email, password };
    }
  } catch (error) {
    console.error(getCredentials.name, "|", error);
  }
}

export async function deleteCredentials() {
  try {
    // deletes credentials from async storage
    // this is executed when signing out

    await AsyncStorage.removeItem("userCredentials");

    console.log(
      deleteCredentials.name,
      "|",
      "saved credentials deleted successfully"
    );
  } catch (error) {
    console.error(deleteCredentials.name, "|", error);
  }
}
