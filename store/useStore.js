import { create } from "zustand"

const useStore = create((set, get) => ({
	posts: [],
	fetchPosts: async () => {
		console.log("Fetching posts")
		try {
			const response = await fetch("/api/prompt", {
				headers: {
					"Cache-Control": "no-store",
				},
			})
			const data = await response.json()
			set({ posts: data })
			console.log("Fetched posts:", data)
		} catch (error) {
			console.error("Error fetching posts:", error)
		}
	},
	addPost: async newPost => {
		console.log("Adding post", newPost)
		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify(newPost),
				headers: {
					"Content-Type": "application/json",
				},
			})
			if (response.ok) {
				const data = await response.json()
				set(state => ({ posts: [data, ...state.posts] }))
				console.log("Added post:", data)
				// Refetch posts to ensure freshness
				await get().fetchPosts()
			} else {
				console.error("Failed to add post:", await response.text())
			}
		} catch (error) {
			console.error("Error adding post:", error)
		}
	},
}))

export default useStore
