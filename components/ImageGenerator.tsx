'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setImageUrl('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      console.log('Response data:', data)
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      } else {
        setError('No image URL received')
      }
    } catch (error) {
      console.error('Error generating image:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && (
        <div className="mt-8">
          <img src={imageUrl} alt="Generated image" className="w-full rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  )
}