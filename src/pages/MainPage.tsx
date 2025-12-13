function MainPage() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">JavaZone 2026</h1>
                    <h2 className="text-3xl font-bold mb-6">
                        September 2nd - 3rd, 2026, NOVA Spektrum, Lillestrøm
                    </h2>
                    <p className="py-6">
                        <a href={"/partner"}
                           className="link link-primary">Partner registration</a> opens January 15th at 10:00
                    </p>
                </div>
            </div>
        </div>


    )
}

export default MainPage;