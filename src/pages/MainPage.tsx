import BubbleSimple from "../components/BubbleSimple";

const MainPage = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <BubbleSimple />
            <div className="hero-content text-center">
                <div className="max-w-md text-center">
                    <h1 className="text-5xl font-bold">JavaZone 2026</h1>
                    <div className="h-2" aria-hidden="true"/>
                    <h2 className="text-3xl font-bold mb-6">
                        September 2nd - 3rd, 2026, NOVA Spektrum, Lillestrøm
                    </h2>
                    <p className={"text-2xl center-text font-semibold"}>Ticket sales open March 2nd</p>

                    <div className="pt-6 pb-8">
                        <a href="https://event.checkin.no/215047/javazone-2026-partnership"
                           className="btn btn-primary btn-lg text-2xl px-12">
                            Register as partner
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default MainPage;