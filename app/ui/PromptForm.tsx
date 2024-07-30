import React, { FC } from 'react'
import { generateImage } from '../lib/actions'

const IMAGE_SIZES = [
	{value: "256x256", label: "256 X 256"},
	{value: "512x512", label: "512 X 512"},
	{value: "1024x1024", label: "1024 X 1024"},
]

interface Props {
    onSubmit: (prompt: string, size: string) => void;
	loading: boolean;
}

const PromptForm: FC<Props> = ({onSubmit, loading}) => {
	
  	const [prompt, setPrompt] = React.useState("")
	const [size, setSize] = React.useState(IMAGE_SIZES[0].value)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		onSubmit(prompt, size)
	}

	
	return (
		<form className={"mt-4"} onSubmit={handleSubmit}>
			<div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
				<div>
					<label
						htmlFor={"prompt"}
						className={"block text-sm font-medium text-primary-main leading-6"}
					>
						Describe the image you wish to generate:
					</label>
					<textarea
						name='prompt'
						onChange={(e) => setPrompt(e.target.value)}
						id={"prompt"}
						placeholder={"Generate a white furry cat sitting on a chair"}
						rows={2}
						className={"mt-2 block w-full px-2 py-1 rounded-md shadow-sm resize-none text-primary-main placeholder:text-primary-light border border-primary-main outline-primary-main text-md"}
					/>
					<span className={"mt-1 text-xs leading-6 text-primary-main"}>You can give a very detailed prompt</span>
				</div>
				<div>
					<div className={"w-full"}>
						<label htmlFor={"size"} className={"block text-sm font-medium leading-6 text-primary-main"}>
							Select Image Size
						</label>
						<select
							id={"size"}
							name={"size"}
							onChange={(e) => setSize(e.target.value)}
							className={"mt-2 w-full px-2 py-3 rounded-md shadow-sm border border-primary-main outline-primary-main text-md text-primary-main"}
						>
							{
								IMAGE_SIZES.map(({value, label}, index) => (
									<option key={index} value={value}>{label}</option>
								))
							}
						</select>
						<div className={"mt-5 text-right"}>
							<button
								type={"submit"}
								disabled={loading}
								className={"rounded-md bg-primary-main px-3 py-2 hover:bg-primary-dark text-primary-contrastText font-semibold shadow-sm disabled:bg-primary-light disabled:cursor-not-allowed"}
							>
								{loading ? "Generating..." : "Generate"}
							</button>
						</div>

					</div>
				</div>
			</div>
		</form>
	)
}

export default PromptForm
