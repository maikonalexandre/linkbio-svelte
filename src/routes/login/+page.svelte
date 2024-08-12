<script lang="ts">
    import { auth, user } from "$lib/firebase";

    import {
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
    } from "firebase/auth";

    // this authentication method don't permit verification on the server
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);

        console.log(user);
    }
</script>

<h2>login</h2>

{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn btn-warning">Sign out</button>
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}
        >Sign with Google</button
    >
{/if}
