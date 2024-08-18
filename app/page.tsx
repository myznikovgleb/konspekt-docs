import { Layout } from '@/src/shared/ui'

export default function Page() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold">Konspekt Docs</h1>
        <span className="text-5xl">📝</span>
      </div>
    </Layout>
  )
}
