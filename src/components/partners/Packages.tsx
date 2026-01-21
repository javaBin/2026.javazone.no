import {Card} from "../index.ts";

const Packages = ({wave = false}) => {
    return (
        <div className="space-y-8">
            <Card title="Standard package" subtitle="Price: 100 000,- NOK ex VAT" wave={wave}
                  className={wave ? "aspect-[3/5] md:aspect-[3/2]" : ''}>
                <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>6 square meters (3x2) with back and side wall, in the main conference hall.</li>
                    <li><strong>Profiling:</strong> Logo with link on homepage and profiling in Nova Spektrum</li>
                    <li><strong>Stand ticket:</strong> 4 flexible tickets for stand personnel.</li>
                    <li><strong>Participant tickets:</strong> Partner price on tickets for your colleagues</li>
                </ul>
            </Card>

            <Card title="Restaurant stand" subtitle="Price: 190 000,- NOK ex VAT" wave={wave}
                  className={wave ? "aspect-[3/5] md:aspect-[3/1.5]" : ''}>
                <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>All the benefits of the standard package with a restaurant stand</li>
                    <li>Approx. 80 square meters with a connected restaurant</li>
                    <li>Continuous food serving from your stand throughout the conference.</li>
                    <li>Menu in cooperation with event partners.</li>
                </ul>
            </Card>

            <Card title="Concept stand" subtitle="Price: 190 000,- NOK ex VAT" wave={wave}
                  className={wave ? "aspect-[0.75] md:aspect-[2]" : ''}>
                <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>All the benefits of the standard package.</li>
                    <li>Stand of approx. 70 square meters</li>
                    <li>Large space for showing off your own concept</li>
                </ul>
            </Card>

            <Card title="Extended package" subtitle="Price: 160 000,- NOK ex VAT" wave={wave}
                  className={wave ? "aspect-[1] md:aspect-[6/2]" : ''}>
                <ul className="mt-4 list-disc pl-6 space-y-2">
                    <li>Same as Standard upgraded to 12 square meters</li>
                </ul>
            </Card>

            <Card title="Partner tickets"
                  subtitle={<>Price: 9 200,- NOK ex VAT{" "}<span
                      className="font-normal">(incl ticket fee)</span></>}
                  wave={wave}
                  className={wave ? "aspect-[0.5] md:aspect-[3/2]" : ''}>
                <div className="mt-4 space-y-3">
                    <p>You have four flexible stand tickets included in your partnership package.
                        These are intended for
                        stand personnel, and do not give access to the talks. You must order tickets
                        for all your employees
                        that want to attend a talk (or if you have more than four who need to be on
                        the stand at once).
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Round robin distribution on tickets ordered by May 15th</li>
                        <li>First come first served if tickets are still available after May 15th</li>
                    </ul>

                    <div className="pt-4 flex justify-center">
                        <a href="https://event.checkin.no/215055/javazone-2026-partner-tickets"
                           className="btn btn-primary px-12">
                            Order partner tickets
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Packages;