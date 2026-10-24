import type { Topic } from '@/components/sections/TopicRows'
import TopicRows from '@/components/sections/TopicRows'

const PackageTitle = ({ name, price }: { name: string; price: string }) => (
  <>
    {name}
    <span className="block mt-2 text-base font-medium tracking-normal text-muted">Price: {price}</span>
  </>
)

const packages: Topic[] = [
  {
    title: <PackageTitle name="Standard package" price="TBA" />,
    body: (
      <ul>
        <li>6 square meters (3x2) with back and side wall, in the main conference hall.</li>
        <li>Stand includes one bar table, two bar stools, carpet (grey) and power outlet</li>
        <li>
          <strong>Profiling:</strong> Logo with link on homepage and profiling at the venue
        </li>
        <li>
          <strong>Stand ticket:</strong> 4 flexible tickets for stand personnel.
        </li>
        <li>
          <strong>Participant tickets:</strong> Partner price on tickets for your colleagues
        </li>
      </ul>
    ),
  },
  {
    title: <PackageTitle name="Restaurant stand" price="TBA" />,
    body: (
      <ul>
        <li>All the benefits of the standard package with a restaurant stand</li>
        <li>Approx. 80 square meters with a connected restaurant</li>
        <li>Continuous food serving from your stand throughout the conference.</li>
        <li>Menu in cooperation with event partners.</li>
      </ul>
    ),
  },
  {
    title: <PackageTitle name="Concept stand" price="TBA" />,
    body: (
      <ul>
        <li>All the benefits of the standard package.</li>
        <li>Stand of approx. 70 square meters</li>
        <li>Large space for showing off your own concept</li>
      </ul>
    ),
  },
  {
    title: <PackageTitle name="Extended package" price="TBA" />,
    body: (
      <ul>
        <li>Same as Standard upgraded to 12 square meters</li>
      </ul>
    ),
  },
  {
    title: <PackageTitle name="Partner tickets" price="TBA" />,
    body: (
      <p>
        You have four flexible stand tickets included in your partnership package. These are intended for stand personnel, and do not give access to
        the talks. You must order tickets for all your employees that want to attend a talk (or if you have more than four who need to be on the stand
        at once). Ordering details: TBA.
      </p>
    ),
  },
]

const Packages = () => <TopicRows topics={packages} as="h3" />

export default Packages
