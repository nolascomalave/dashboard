// import { Backend_URL } from "@/lib/Constants";
import { ClientFetch } from "@/util/Fetching";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  if(!token || !token.backendTokens) return token;

  const ftc = new ClientFetch();

  const res = await ftc.post({
    url: process.env.API + "/auth/refresh",
    data: token.user,
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: res.status !== 200 ? null : response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
        id_system_subscription: {}
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password || !credentials?.id_system_subscription) return null;
        const { username, password, id_system_subscription } = credentials;

        const ftc = new ClientFetch();

        const res = await ftc.post({
            url: process.env.API + "/auth/login",
            method: "POST",
            data: {
                username,
                password,
                id_system_subscription: Number(id_system_subscription),
                id_system: Number(process.env.id_system)
            }
        });

        if(res.status === 500) {
          throw new Error('Unknown error.');
        }

        const response = await res.json();

        if(res.status !== 200) {
          throw new Error(JSON.stringify(response));
        }

        return response;
      },
    }),
  ],

  callbacks: {
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };