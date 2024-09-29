import { Layout } from '@/src/shared/ui'
import { FeedbackSection } from '@/src/widgets/feedback'
import { HeroSection } from '@/src/widgets/hero'

export default function Page() {
  return (
    <Layout>
      <HeroSection />
      <FeedbackSection />
    </Layout>
  )
}
