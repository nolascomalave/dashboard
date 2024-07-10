// import { Backend_URL } from "@/lib/Constants";
import { ClientFetch } from "@/util/Fetching";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.API + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
    /* session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    }, */
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          /* label: "Username",
          type: "text",
          placeholder: "Username", */
        },
        password: {
            /* label: "Password",
            type: "password" */
        },
        id_system_subscription: {
            /* label: 'Subscribed entity',
            type: 'number' */
        }
      },
      async authorize(credentials, req) {
        console.log('Coño de la madre.');
        if (!credentials?.username || !credentials?.password || !credentials?.id_system_subscription) return null;
        const { username, password, id_system_subscription } = credentials;

        const ftc = new ClientFetch();

        const res = await ftc.post({
            url: process.env.API + "/auth/login",
            method: "POST",
            data: {
                /* username,
                password,
                id_system_subscription: Number(id_system_subscription) */
            },
            /* headers: {
                "Content-Type": "application/json",
            }, */
        });

        if (res.status !== 500) {
            const response = await res.json();
            throw new Error(JSON.stringify(response));
        }

        const { user } = await res.json();
        return user;
      },
    }),
  ],

  /* callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  }, */
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };