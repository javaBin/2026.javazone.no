const ProgramSkeleton = () => (
  <div className="flex flex-col gap-10">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <div className="w-32 h-8 rounded-full bg-base-100/60 animate-pulse" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="flex flex-col h-32 gap-3 px-5 py-4 rounded-3xl bg-base-200 animate-pulse">
              <div className="h-2.5 w-1/2 rounded-full bg-base-300/60" />
              <div className="w-5/6 h-4 rounded-full bg-base-300/40" />
              <div className="h-2.5 w-1/3 rounded-full bg-base-300/30" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default ProgramSkeleton
