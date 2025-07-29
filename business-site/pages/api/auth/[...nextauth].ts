import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createHash } from 'crypto';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        const user = await User.findOne({ email });
        if (!user) return null;
        const hash = createHash('sha256').update(password).digest('hex');
        if (hash !== user.password) return null;
        return { id: user._id.toString(), email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default handler;
