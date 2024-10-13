import { Layout } from '@/src/shared/ui'
import { FeedbackSection } from '@/src/widgets/feedback'
import { HeroSection } from '@/src/widgets/hero'
import { Navbar } from '@/src/widgets/navbar'

export default function Page() {
  return (
    <Layout>
      <Navbar />
      <HeroSection />
      <FeedbackSection />
    </Layout>
  )
}
