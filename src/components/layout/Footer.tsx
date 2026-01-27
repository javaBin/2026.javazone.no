
const Footer = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40">
            <div className="
                pointer-events-none absolute inset-0 backdrop-blur-sm
                [mask-image:linear-gradient(to_top,black_75%,transparent_100%)]
                [-webkit-mask-image:linear-gradient(to_top,black_75%,transparent_100%)]
            "/>

            <div className="relative bg-transparent flex justify-center gap-4 p-4 shadow-lg">
                <a href="https://www.java.no" className="text-primary hover:bg-base-300 no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]">Made by javaBin</a>
                <a href="https://java.no/principles" className="text-primary hover:bg-base-300 no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]">Code of conduct</a>
            </div>
        </div>
    )
}

export default Footer;