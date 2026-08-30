import { useEffect } from 'react'

import { Assets } from '@/Assets'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const InMemoriamPage = () => {
  useOpenGraph({
    title: 'In Memory of King Harald V | JavaZone',
    description: 'JavaZone remembers His Majesty King Harald V.',
  })

  // The footer is transparent and relies on the body's background showing through, so
  // this page needs to override the body's usual blue site gradient to stay black behind it too.
  useEffect(() => {
    const previousBackground = document.body.style.background
    document.body.style.background = 'black'
    return () => {
      document.body.style.background = previousBackground
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 pt-24 pb-16 space-y-8 text-center">
        <img
          src={Assets.photos.kingHaraldV.src}
          alt="Portrait of His Majesty King Harald V of Norway"
          className="w-48 md:w-56 rounded-sm shadow-xl"
        />
        <p className="text-xs text-gray-500">{Assets.photos.kingHaraldV.attribute}</p>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white" style={{ background: 'none', WebkitTextFillColor: 'white' }}>
          In Memory of King Harald V
        </h1>

        <div className="w-full max-w-2xl space-y-4 text-left text-gray-300">
          <p>We are deeply saddened by the passing of His Majesty King Harald V.</p>
          <p>
            King Harald served Norway for decades with dedication, warmth and a strong sense of duty. His passing marks a significant moment for the
            country, and our thoughts and sincere condolences are with the Royal Family and everyone mourning his loss.
          </p>
          <p>
            JavaZone will take place as planned next week. We will, of course, follow any official guidance and adapt where appropriate, with respect
            for the period of national mourning.
          </p>
          <p className="pt-4">
            With respect,
            <br />
            The JavaZone team
          </p>
        </div>
      </div>
    </div>
  )
}

export default InMemoriamPage
