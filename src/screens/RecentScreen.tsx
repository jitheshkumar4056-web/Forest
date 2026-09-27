import { recentKeralaJudgments } from '../data/demoData'
import { useStore } from '../store'
import { JudgmentCard } from '../components/JudgmentCard'
import { Notice, ScreenHeader } from '../components/ui'

export function RecentScreen() {
  const { pop } = useStore()
  return (
    <div>
      <ScreenHeader
        title="Recent Decisions"
        subtitle="Kerala High Court · demo corpus"
        onBack={pop}
      />
      <div className="px-4 pt-4 pb-4">
        <Notice tone="gold">
          Sample judgments created for demonstration — not real decisions. In the full product this feed would come
          from the Kerala High Court website with a link to each certified copy.
        </Notice>
        <div className="mt-4 flex flex-col gap-3">
          {recentKeralaJudgments.map((j) => (
            <JudgmentCard key={j.id} judgment={j} />
          ))}
        </div>
      </div>
    </div>
  )
}
