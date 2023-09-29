import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";

const handler = NextAuth({
    pages: {
      signIn: '/login',
    },
    providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          profile(profile) {
            return { role: profile.role ?? "user" }
          },
          username: { label: "Username", type: "text", placeholder: "username" },
          password: { label: "Password", type: "password", placeholder: "*****" }
        },
        async authorize(credentials, req) {
          const { username, password } = credentials;
  
          await db.connect();
  
          const user = await User.findOne({ username });
        
          if(!user){
            throw new Error("Invalid inputuser")
        }
  
        // 2 parameters -> 
        // 1 normal password -> 123123
        // 2 hashed password -> dasuytfygdsaidsaugydsaudsadsadsauads
        const comparePass = await bcrypt.compare(password, user.password)
  
        if (user.password !== password) {
          throw new Error("Invalid inpuddddddd")
      } else {
          const {password, ...currentUser} = user._doc
  
            const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})
  
            return {
                ...currentUser,
                accessToken
            }
        }
    }
  })
  ],
       callbacks: {
          async jwt({token, user}){
              if(user){
                  token.accessToken = user.accessToken
                  token._id = user._id
                  token.role = user.role
              }
              return token
          },
          async session({session, token}){
              if(token){
                  session.user._id = token._id
                  session.user.accessToken = token.accessToken
                  session.user.role = token.role
              }
              return session
          }
      }
  })
  
  export { handler as GET, handler as POST };