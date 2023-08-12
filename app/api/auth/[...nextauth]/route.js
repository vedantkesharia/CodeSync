import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async session({ session }) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
    
        return session;
      },
      async signIn({ profile }) {
        try {
          await connectToDB();
    
          //here check if user already exists
          const userExists = await User.findOne({
            email: profile.email,
          });
    
          // if not, create a new document and save user in MongoDB
          
        const profileName = profile.name;
        let modifiedUsername = profileName.replace(" ", "").toLowerCase();

        if (modifiedUsername.length < 3) {
          const randomChars = Math.random().toString(36).substr(2, 8);
          modifiedUsername = `${modifiedUsername}_${randomChars}`;
        }
          if (!userExists) {
      //       const firstName = profile.name.split(' ')[0]; // Extract the first name
      // const uniqueIdentifier = Math.random().toString(36).substr(2, 8); 
            await User.create({
              email: profile.email,
              username:modifiedUsername,
              // username: profile.name.replace(" ", "").toLowerCase(),
              // username: `${firstName}_${uniqueIdentifier}`,
              image: profile.picture,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
  }
  
});

export { handler as GET, handler as POST };
