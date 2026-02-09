import { Card } from '@/components'

const HistoryPage = () => {
  const years = [2025, 2024, 2023, 2022]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 mx-6 sm:mx-0">
      <Card title="History" subtitle="Previous JavaZone conferences" className="w-full max-w-lg z-10">
        <ul className="bg-base-200 rounded-4xl overflow-hidden w-full m-0 mt-4 py-2 list-none">
          {years.map((year) => (
            <li key={year} className="px-2">
              <a
                href={`https://${year}.javazone.no`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 px-4 rounded-3xl
                                text-base-content transition-colors duration-200 hover:bg-base-300"
              >
                JavaZone {year}
                <span className="badge badge-outline">Visit</span>
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default HistoryPage
