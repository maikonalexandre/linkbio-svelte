import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyDqnkutGZZjbiL06P5XpvTy61iOtqGgG3w",
    authDomain: "sveltcourse.firebaseapp.com",
    projectId: "sveltcourse",
    storageBucket: "sveltcourse.appspot.com",
    messagingSenderId: "187409395710",
    appId: "1:187409395710:web:36c5d3dabec8c4d8addaaf",
    measurementId: "G-WTVKF4KS32",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth();
export const db = getFirestore();

function userStore() {
    //     const currentUser = writable<User | null>;
    //
    //     onAuthStateChanged(auth, (user) => {
    //        currentUser.set(user);
    //     });

    if (!auth || !globalThis.window) {
        console.warn("Auth is not initialized in the browser");
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe,
        };
    }

    const { subscribe } = writable(auth?.currentUser, (set) => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribed();
    });

    return {
        subscribe,
    };
}

export const user = userStore();

function docStore<T>(path: string) {
    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        const unsubscribed = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribed();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
}

interface UserData {
    username: string;
    bio: string;
    photoURL: string;
    published: boolean;
    links: any[];
}

export const userData: Readable<UserData | null> = derived(
    user,
    ($user, set) => {
        if ($user) {
            return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
        } else {
            set(null);
        }
    }
);
