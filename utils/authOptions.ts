import { baseUrl } from "@/config/base"
import  { NextAuthOptions } from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
 const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const url = `${baseUrl}/login`;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const user = await response.json()
				if (user && response.ok) {
					return user
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks:{
		async jwt({token,user})
	    {
		
			user && (token.user = user)
			return token

		},
		async session({session,token}){
	
			session = token as any
			return session
		}
	}

}

export {authOptions}