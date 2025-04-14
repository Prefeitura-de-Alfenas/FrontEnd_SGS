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
	callbacks: {
		async jwt({ token, user }) {
		
		  if (user) {
			token.user = user; // Aqui o user tem o access_token vindo do backend
		  }
		  return token;
		},
	  
		async session({ session, token }) {
		  // Garante que `session.user.access_token` estará disponível no frontend
		  if (token?.user) {
			session.user = token.user;
		  }
		  return session;
		},
	  },

}

export {authOptions}