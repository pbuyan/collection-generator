import React, { Suspense, useState } from 'react'
import PromptForm from './PromptForm'
import GeneratedImagesSkeleton from './GeneratedImagesSkeleton'
import GeneratedImages from './GeneratedImages'

const CollectionSection = () => {

	const [loading, setLoading] = useState(false)
	const [images, setImages] = React.useState([])

	const handleSubmit = async (prompt: string, size: string) => {
		setLoading(true)
		const body = {prompt, size}
		let response: any = await fetch("/api/imageGeneration", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json'
			}
		})

		if (response.ok) {
			response = await response.json()
			setImages(response.data)
		}

		setLoading(false)
	}

	return (
		<>
			<div className={"max-w-5xl mx-auto px-5 lg:px-0 min-h-[calc(100vh-170px)]"}>
				<PromptForm onSubmit={handleSubmit} loading={loading} />
				<div>
					<Suspense fallback={<GeneratedImagesSkeleton/>}>
						<GeneratedImages images={images} loading={loading} />
					</Suspense>
				</div>
			</div>
		</>
	)
}

export default CollectionSection
