import { Client, Account, ID, Avatars, Databases, Storage, Query } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.wsei.wseiapp',
    projectId: '667b22bd00300b8ead7a',
    databaseId: '667b23fb001ce82853f2',
    userCollectionId: '667b2414000ef21bc7a6',
    storageId: '667b2bb00035a1a00337'
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}
export const signIn = async(email, password) => {
    //const currentSession = await account.getSession('current');
    // if(currentSession) return currentSession;
    //return currentSession;
    const current = await account.getSession('current');
    if(current) return current;

    
    const newSession = await account.createEmailPasswordSession(email,password);
    try {
      return newSession;
    } catch (error) {
      throw new Error(error)
    }
  }

// Sign In
// export const signIn = async(email, password) => {
//     try {
//         const currentSession = await account.getSession("current");
//         if (currentSession) return currentSession;
//         const newSession = await account.createEmailPasswordSession(
//           email,
//           password
//         );
//         return newSession;
//       } catch (error) {
//         throw new Error(error);
//       }
//     }

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error)
  }
}


