import ImageGenerator from '@/components/ImageGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Flux Image Generator</h1>
        <ImageGenerator />
      </div>
    </main>
  )
}
