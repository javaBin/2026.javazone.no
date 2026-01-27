import Accenture from '../../../public/partners/accenture.svg';
import Bekk from '../../../public/partners/bekk.svg';
import Bouvet from '../../../public/partners/bouvet.svg';
import Capgemini from '../../../public/partners/capgemini.svg';
import Capra from '../../../public/partners/capra.svg';
import CGI from '../../../public/partners/cgi.svg';
import Cloudberries from '../../../public/partners/cloudberries.svg';
import Computas from '../../../public/partners/computas.svg';
import DNB from '../../../public/partners/dnb.svg';
import Elastic from '../../../public/partners/elastic.svg';
import Embriq from '../../../public/partners/embriq.svg';
import Entur from '../../../public/partners/entur.svg';
import VEND from '../../../public/partners/finn.svg';
import Fremtind from '../../../public/partners/fremtind.svg';
import Gjensidige from '../../../public/partners/gjensidige.svg';
import Husbanken from '../../../public/partners/husbanken.svg';
import Kantega from '../../../public/partners/kantega.svg';
import Knowit from '../../../public/partners/knowit.svg';
import Kodemaker from '../../../public/partners/kodemaker.svg';
import Miles from '../../../public/partners/miles.svg';
import Netcompany from '../../../public/partners/netcompany-cropped.svg';
import NorskTipping from '../../../public/partners/norsktipping.svg';
import PolitietPIT from '../../../public/partners/politietpit.svg';
import PostenBring from '../../../public/partners/postenbring.svg';
import RedHat from '../../../public/partners/redhat.svg';
import Scelto from '../../../public/partners/scelto.svg';
import Scienta from '../../../public/partners/scienta.svg';
import Skatteetaten from '../../../public/partners/skatteetaten.svg';
import SopraSteria from '../../../public/partners/soprasteria.svg';
import Sparebank1 from '../../../public/partners/sparebank1.svg';
import StatensVegvesen from '../../../public/partners/statensvegvesen.svg';
import Statnett from '../../../public/partners/statnett.svg';
import Storebrand from '../../../public/partners/storebrand.svg';
import Systek from '../../../public/partners/systek.svg';
import Telenor from '../../../public/partners/telenor.svg';
import TetDigital from '../../../public/partners/tetdigital.svg';
import Tietoevry from '../../../public/partners/tietoevry.svg';
import Tolletaten from '../../../public/partners/tolletaten.svg';
import Tripletex from '../../../public/partners/tripletex.svg';
import Uptime from '../../../public/partners/uptime.svg';
import Vaadin from '../../../public/partners/vaadin.svg';
import Webstep from '../../../public/partners/webstep.svg';
import Apotek1 from '../../../public/partners/apotek1.svg';
// import BankID from '../../../public/partners/bankid.svg';
import Bronoy from '../../../public/partners/brreg.svg';
import Crayon from '../../../public/partners/crayonconsulting.svg';
import ElOgIt from '../../../public/partners/elogit.svg';
import GE from '../../../public/partners/ge.svg';
import JetBrains from '../../../public/partners/jetbrains.svg';
import JPRO from '../../../public/partners/jpro.svg';
import Mastercard from '../../../public/partners/mastercard.svg';
import Sonat from '../../../public/partners/sonat.svg';
import Tomra from '../../../public/partners/tomra.svg';
import Yne from '../../../public/partners/yne.svg';
import Ambita from '../../../public/partners/ambita.svg';
import NAV from '../../../public/partners/nav.svg';
import KSDigitaleFellestjenester from '../../../public/partners/ks-digitale-fellestjenester.svg';
import GoogleCloud from '../../../public/partners/googlecloud.svg';
import Kartverket from '../../../public/partners/kartverket.svg';
import SSB from '../../../public/partners/ssb.svg';
import STOE from '../../../public/partners/stoe.svg';

interface Partner {
    name: string;
    homepageUrl: string;
    logoUrl: string;
}

export const partners: Partner[] = [
    { name: 'Accenture', homepageUrl: 'https://www.accenture.com', logoUrl: Accenture },
    { name: 'Bekk', homepageUrl: 'https://www.bekk.no', logoUrl: Bekk },
    { name: 'Bouvet', homepageUrl: 'https://www.bouvet.no', logoUrl: Bouvet },
    { name: 'Capgemini', homepageUrl: 'https://www.capgemini.com', logoUrl: Capgemini },
    { name: 'Capra', homepageUrl: 'https://www.capraconsulting.no', logoUrl: Capra },
    { name: 'CGI', homepageUrl: 'https://www.cgi.com', logoUrl: CGI },
    { name: 'Cloudberries', homepageUrl: 'https://www.cloudberries.no', logoUrl: Cloudberries },
    { name: 'Computas', homepageUrl: 'https://computas.com', logoUrl: Computas },
    { name: 'DNB', homepageUrl: 'https://www.dnb.no', logoUrl: DNB },
    { name: 'Elastic', homepageUrl: 'https://www.elastic.co', logoUrl: Elastic },
    { name: 'Embriq', homepageUrl: 'https://www.embriq.no', logoUrl: Embriq },
    { name: 'Entur', homepageUrl: 'https://www.entur.no', logoUrl: Entur },
    { name: 'Finn', homepageUrl: 'https://www.finn.no', logoUrl: VEND },
    { name: 'Fremtind', homepageUrl: 'https://www.fremtind.no', logoUrl: Fremtind },
    { name: 'Gjensidige', homepageUrl: 'https://www.gjensidige.no', logoUrl: Gjensidige },
    { name: 'Husbanken', homepageUrl: 'https://www.husbanken.no', logoUrl: Husbanken },
    { name: 'Kantega', homepageUrl: 'https://www.kantega.no', logoUrl: Kantega },
    { name: 'Knowit', homepageUrl: 'https://www.knowit.no', logoUrl: Knowit },
    { name: 'Kodemaker', homepageUrl: 'https://www.kodemaker.no', logoUrl: Kodemaker },
    { name: 'Miles', homepageUrl: 'https://www.miles.no', logoUrl: Miles },
    { name: 'Netcompany', homepageUrl: 'https://www.netcompany.com', logoUrl: Netcompany },
    { name: 'Norsk Tipping', homepageUrl: 'https://www.norsk-tipping.no', logoUrl: NorskTipping },
    { name: 'Politiet PIT', homepageUrl: 'https://www.politiet.no', logoUrl: PolitietPIT },
    { name: 'Posten Bring', homepageUrl: 'https://www.bring.no', logoUrl: PostenBring },
    { name: 'Red Hat', homepageUrl: 'https://www.redhat.com', logoUrl: RedHat },
    { name: 'Scelto', homepageUrl: 'https://www.scelto.no', logoUrl: Scelto },
    { name: 'Scienta', homepageUrl: 'https://www.scienta.no', logoUrl: Scienta },
    { name: 'Skatteetaten', homepageUrl: 'https://www.skatteetaten.no', logoUrl: Skatteetaten },
    { name: 'Sopra Steria', homepageUrl: 'https://www.soprasteria.no', logoUrl: SopraSteria },
    { name: 'Sparebank-1', homepageUrl: 'https://www.sparebank1.no', logoUrl: Sparebank1 },
    { name: 'Statens Vegvesen', homepageUrl: 'https://www.vegvesen.no', logoUrl: StatensVegvesen },
    { name: 'Statnett', homepageUrl: 'https://www.statnett.no', logoUrl: Statnett },
    { name: 'Storebrand', homepageUrl: 'https://www.storebrand.no', logoUrl: Storebrand },
    { name: 'Systek', homepageUrl: 'https://www.systek.no', logoUrl: Systek },
    { name: 'Telenor', homepageUrl: 'https://www.telenor.no', logoUrl: Telenor },
    { name: 'Tet Digital', homepageUrl: 'https://ruter.no/om-ruter/jobb', logoUrl: TetDigital },
    { name: 'Tietoevry', homepageUrl: 'https://www.tietoevry.com', logoUrl: Tietoevry },
    { name: 'Tolletaten', homepageUrl: 'https://www.toll.no', logoUrl: Tolletaten },
    { name: 'Tripletex', homepageUrl: 'https://www.tripletex.no', logoUrl: Tripletex },
    { name: 'Uptime', homepageUrl: 'https://www.uptimeconsulting.no', logoUrl: Uptime },
    { name: 'Vaadin', homepageUrl: 'https://vaadin.com', logoUrl: Vaadin },
    { name: 'Webstep', homepageUrl: 'https://www.webstep.no', logoUrl: Webstep },
    { name: 'Apotek1', homepageUrl: 'https://www.apotek1.no', logoUrl: Apotek1 },
    // { name: 'BankID', homepageUrl: 'https://bankid.no', logoUrl: BankID },
    { name: 'Bronnoysundregistrene', homepageUrl: 'https://www.brreg.no', logoUrl: Bronoy },
    { name: 'Crayon', homepageUrl: 'https://crayonconsulting.no', logoUrl: Crayon },
    { name: 'El og IT', homepageUrl: 'https://elogit.no', logoUrl: ElOgIt },
    { name: 'GE', homepageUrl: 'https://www.gevernova.com', logoUrl: GE },
    { name: 'JetBrains', homepageUrl: 'https://www.jetbrains.com', logoUrl: JetBrains },
    { name: 'JPRO', homepageUrl: 'https://www.jpro.no', logoUrl: JPRO },
    { name: 'Mastercard', homepageUrl: 'https://www.mastercard.com', logoUrl: Mastercard },
    { name: 'Sonat', homepageUrl: 'https://www.sonat.no', logoUrl: Sonat },
    { name: 'Tomra', homepageUrl: 'https://www.tomra.com', logoUrl: Tomra },
    { name: 'Yne', homepageUrl: 'https://www.yne.no', logoUrl: Yne },
    { name: 'Ambita', homepageUrl: 'https://www.ambita.com', logoUrl: Ambita },
    { name: 'NAV', homepageUrl: 'https://www.detsombetyrnoe.no/nav-pa-javazone-2025', logoUrl: NAV },
    { name: 'KS Digitale Fellestjenester', homepageUrl: 'https://ksdigital.no/', logoUrl: KSDigitaleFellestjenester },
    { name: 'Google Cloud', homepageUrl: 'https://cloud.google.com', logoUrl: GoogleCloud },
    { name: 'Kartverket', homepageUrl: 'https://www.kartverket.no', logoUrl: Kartverket },
    { name: 'SSB', homepageUrl: 'https://www.ssb.no', logoUrl: SSB },
    { name: 'STØ', homepageUrl: 'https://stoe.no/', logoUrl: STOE },
];