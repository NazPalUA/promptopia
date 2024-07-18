import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const fetchCache = "force-no-store"
export const dynamic = "force-dynamic" // defaults to auto

export const GET = async request => {
	try {
		await connectToDB()

		const prompts = await Prompt.find({}).populate("creator")

		return new Response(JSON.stringify(prompts), {
			status: 200,
			headers: {
				"Cache-Control": "no-store",
			},
		})
	} catch (error) {
		return new Response("Failed to fetch all prompts", {
			status: 500,
			headers: {
				"Cache-Control": "no-store",
			},
		})
	}
}
