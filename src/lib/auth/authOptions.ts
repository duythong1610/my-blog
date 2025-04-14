import { authApi } from "@/api/auth.api";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

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
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      try {
        const oauthInfo: OAuthProviderInfo = {
          provider: account.provider,
          providerId: account.providerAccountId,
          email: user.email,
          name: user.name,
          image: user.image,
        };

        const response = await authApi.oauth(oauthInfo);

        if (response.data.success) {
          const data = response.data;
          if (data) {
            user.id = data.userId;
            user.username = data.username;
            user.role = data.role;
            user.accessToken = data.accessToken;
            return true;
          }
        }

        return false;
      } catch (error) {
        console.error("OAuth error:", error);
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
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
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
