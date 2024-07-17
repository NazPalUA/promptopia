"use client"

import Form from "@components/Form"
import useStore from "@store/useStore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreatePrompt = () => {
	const router = useRouter()
	const { data: session } = useSession()
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState({ prompt: "", tag: "" })
	const addPost = useStore(state => state.addPost)

	const createPrompt = async e => {
		e.preventDefault()
		setSubmitting(true)

		try {
			await addPost({
				prompt: post.prompt,
				userId: session?.user.id,
				tag: post.tag,
			})

			setPost({ prompt: "", tag: "" })
			router.push("/")
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}

export default CreatePrompt
