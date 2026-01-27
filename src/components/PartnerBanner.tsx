import "./PartnerBanner.css"
import {partners} from "../assets/partners/partners.ts";

export const PartnerBanner = () => {
    return (
        <div className="block w-screen p-4 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] mt-4">
            <div className="flex flex-wrap justify-center gap-10">
                {partners.map((partner) => (
                    <a target="_blank" href={partner.homepageUrl} key={partner.name}>
                        <img
                            width={10}
                            height={10}
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="h-16 w-40 transform transition-transform hover:scale-125"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}