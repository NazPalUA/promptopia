import User from "@models/user"
import { connectToDB } from "@utils/database"
import sanitizeUsername from "@utils/sanitizeUsername" // Import the utility function
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const isProduction =
	process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					scope: "openid email profile",
				},
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	cookies: {
		sessionToken: {
			name: `__Secure-next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: isProduction,
			},
		},
	},
	callbacks: {
		async session({ session }) {
			// store the user id from MongoDB to session
			const sessionUser = await User.findOne({ email: session.user.email })
			session.user.id = sessionUser._id.toString()
			return session
		},
		async signIn({ account, profile, user, credentials }) {
			try {
				await connectToDB()

				// Sanitize the username
				const sanitizedUsername = sanitizeUsername(
					profile.name.replace(" ", "").toLowerCase()
				)

				// check if user already exists
				const userExists = await User.findOne({ email: profile.email })

				// if not, create a new document and save user in MongoDB
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: sanitizedUsername,
						image: profile.picture,
					})
				}

				return true
			} catch (error) {
				console.log("Error checking if user exists: ", error.message)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
