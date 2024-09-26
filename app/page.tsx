import { Layout, Section } from '@/src/shared/ui'
import { FeedbackForm } from '@/src/widgets/feedback-form'

export default function Page() {
  return (
    <Layout>
      <Section>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold">Konspekt Docs</h1>
          <span className="text-5xl">📝</span>
        </div>
      </Section>
      <Section>
        <FeedbackForm />
      </Section>
    </Layout>
  )
}
