// Configuration for Appwrite
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.react_native.aora',
  projectId: '6738af5e001995cd5838',
  databaseId: '6738e440000c79e4e70b',
  userCollectionId: '6738e44b003ac396b393',
  videosCollectionId: '6738e46d0035f4b55e9d',
  storageId: '6738e744002f816cfa81'
};

// Initialize the Appwrite Client
import { Client, Account, Databases, Avatars, ID } from 'react-native-appwrite';
// import { config } from './config';  // Make sure your config is imported correctly

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
  try {
    console.log("Creating account...");

    // Check if there's an active session
    const currentSession = await account.getSession('current').catch(() => null);
    if (currentSession) {
      console.log("User already signed in:", currentSession);
      return currentSession;
    }

    // Create a new account
    const newAccount = await account.create(
      ID.unique(),  // Unique ID for the user
      email,        // User email
      password,     // User password
      username      // Username
    );
    console.log("Account created:", newAccount);

    const avatarUrl = avatars.getInitials(username);  // Get avatar initials

    // Sign in the user
    console.log("Signing in...");
    const signInSession = await signIn(email, password);  // Renamed to avoid conflict

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      newAccount.$id,
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    console.log("User document created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error.message);
    throw new Error(error.message);
  }
}

// Sign In Function
export async function signIn(email, password) {
  try {
    const session = await account.createSession('email', email, password);  // Use 'email' as the first argument
    console.log("Sign in successful:", session);
    return session;
  } catch (error) {
    console.error("Error during sign in:", error.message);
    throw new Error(error.message);
  }
}
