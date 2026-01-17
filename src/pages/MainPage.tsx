//import BubbleBackground from "../components/BubbleBackground";
import BubbleSimple from "../components/BubbleSimple";
//import BubbleSimple from "../components/Bubble2";

function MainPage() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <BubbleSimple />
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">JavaZone 2026</h1>
                    <div className="h-2" aria-hidden="true" />
                    <h2 className="text-3xl font-bold mb-6">
                        September 2nd - 3rd, 2026, NOVA Spektrum, Lillestrøm
                    </h2>
                    <p className={"text-2xl font-semibold"} >Ticket sales open March 2nd</p>

                    <div className="h-5" aria-hidden="true" />

                    <p className="text-2xl font-semibold">
                        <a href={"/partner"}
                           className="link link-primary text-black">Partner registration</a> opens January 15th at 10:00am CET
                    </p>
                </div>
            </div>
        </div>


    )
}

export default MainPage;