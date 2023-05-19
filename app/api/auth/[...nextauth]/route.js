import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { ConnectToDB } from "/utils/database.js"
import User from "@models/user.js";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await ConnectToDB();

                // check if the user already exists
                const UserExists = await User.findOne({
                    email: profile.email
                });
                // if not, create a new user
                if (!UserExists) {
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error.message);
                return false;
            }
        },
    }

})

export { handler as GET, handler as POST };