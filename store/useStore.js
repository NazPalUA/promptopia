import { create } from "zustand"

const useStore = create(set => ({
	posts: [],
	fetchPosts: async () => {
		const response = await fetch("/api/prompt")
		const data = await response.json()
		set({ posts: data })
	},
	addPost: async newPost => {
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
		}
	},
}))

export default useStore
