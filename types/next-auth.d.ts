import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            display_name: string,
            photo: string,
        }
    }
}