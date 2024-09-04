import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: Request) {
  const { prompt } = await request.json()

  console.log('Received prompt:', prompt)
  console.log('API Token:', process.env.REPLICATE_API_TOKEN)

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell:1.0.0",  // Specify the version
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80
        },
      }
    )

    console.log('API Response:', output)

    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ imageUrl: output[0] })
    } else {
      throw new Error('Unexpected API response format')
    }
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}