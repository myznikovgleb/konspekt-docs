import { Layout, Section } from '@/src/shared/ui'
import { FeedbackForm } from '@/src/widgets/feedback-form'
import { HeroSection } from '@/src/widgets/hero'

export default function Page() {
  return (
    <Layout>
      <HeroSection />
      <Section>
        <FeedbackForm />
      </Section>
    </Layout>
  )
}
