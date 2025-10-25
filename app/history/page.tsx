export default function HistoryPage() {
    const years = [2025, 2024, 2023, 2022];

    return (
        <div className="min-h-screen bg-[#e4d8b4] flex flex-col items-center py-12">
            <div className="card w-full max-w-md bg-[#ece3ca] shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl font-bold text-primary mb-4">
                        ☕ History
                    </h1>
                    <p className="text-base-content/80 mb-4">
                        Previous JavaZone conferences:
                    </p>

                    <ul className="menu bg-[#e4d8b4] rounded-box w-full">
                        {years.map((year) => (
                            <li key={year}>
                                <a
                                    href={`https://${year}.javazone.no`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="justify-between hover:bg-[#cfc4a3]"
                                >
                                    JavaZone {year}
                                    <span className="badge badge-outline">Visit</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}