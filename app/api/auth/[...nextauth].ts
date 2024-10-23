import NextAuth from "next-auth";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@exemplo.com" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email e senha são obrigatórios");
                    }
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    );
                    const user = userCredential.user;
                    return {
                        id: user.uid,
                        name: user.displayName || null,
                        email: user.email,
                    };
                } catch (error) {
                    throw new Error("Email ou senha inválidos");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                //@ts-ignore
                session.user?.uid = token.uid;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
});
