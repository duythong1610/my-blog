// app/api/auth/[...nextauth]/route.ts
import { authApi } from "@/api/auth.api";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  username: string;
  role: string;
  email?: string;
  name?: string;
  image?: string;
  accessToken?: string;
}

interface OAuthProviderInfo {
  provider: string;
  providerId: string;
  email?: string;
  name?: string;
  image?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        // Process OAuth login through your backend API
        const oauthInfo: OAuthProviderInfo = {
          provider: account.provider,
          providerId: account.providerAccountId,
          email: user.email,
          name: user.name,
          image: user.image,
        };

        const response = await authApi.oauth(oauthInfo);

        console.log({ oauthInfo });
        console.log({ response });

        if (response.data.success) {
          const data = response.data;
          if (data) {
            // Add backend response data to user object
            user.id = data.userId;
            user.username = data.username;
            user.role = data.role;
            user.accessToken = data.accessToken;

            return true;
          }
        }

        return false;
      } catch (error) {
        console.error("Error during OAuth authentication:", error);
        return false;
      }
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: any;
    }) {
      // Update token when user signs in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      console.log({ token });
      console.log({ session });
      // Add custom properties to the session
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.user.provider = token.provider;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Create NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
