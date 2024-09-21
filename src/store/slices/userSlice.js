import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

// thunk for login
export const loginUserToFirebase = createAsyncThunk(
  "user/loginUserToFirebase",
  async (userInfo) => {
    console.log(userInfo);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    // Access user info
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
    console.log("User signed in:", user);

    return user;
  }
);

// Register user and add to Firestore
export const registerUserToFirebase = createAsyncThunk(
  "user/registerUserToFirebase",
  async (userInfo, { rejectWithValue }) => {
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      const authUser = userCredential.user; // Get the created user

      // Add the user info to Firestore
      await setDoc(doc(db, "Users", authUser.uid), {
        user_name: userInfo.user_name,
        email: userInfo.email,
      });

      return {
        uid: authUser.uid,
        email: userInfo.email,
        user_name: userInfo.user_name,
      };
    } catch (error) {
      console.error("Error during user registration:", error.message);

      // Pass the error to Redux Toolkit's error handler
      return rejectWithValue(error.message);
    }
  }
);
// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            resolve({ ...docSnap.data(), uid: user.uid });
          } else {
            reject("User profile not found");
          }
        } else {
          reject("User not authenticated");
        }
      });
    });
  }
);

// sign out user
export const signOut = createAsyncThunk("user/signOut", async () => {
  return await auth.signOut();
});

// Slice to handle user authentication and profile state
const userSlice = createSlice({
  name: "user",
  initialState: {
    isOpen: false,
    isAuthenticated: false,
    userDetails: {
      uid: "",
      user_name: "",
      email: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    signInModelOpen(state) {
      state.isOpen = true;
    },
    signInModelClose(state) {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserToFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserToFirebase.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("User signed up successfully!");
      })
      .addCase(registerUserToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUserToFirebase.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
        toast.success("User signed in successfully!");
      })
      .addCase(loginUserToFirebase.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userDetails = null;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userDetails = null;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userDetails = null;
        toast.success("User has been signed out");
      })
      .addCase(signOut.rejected, (_, action) => {
        toast.error(action.payload);
      });
  },
});

export const selectUserDetails = (state) => state.user.userDetails;
export const { signInModelClose, signInModelOpen } = userSlice.actions;

export default userSlice.reducer;
