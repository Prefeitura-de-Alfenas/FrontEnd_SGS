import NextAuth  from "next-auth/next";
declare module NextAuth {
    interface Session{
        user:{
            email:string;
            nome:string;
            role:string[];
            access_token:string;
        }
    }
}