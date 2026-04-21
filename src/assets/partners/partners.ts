import Accenture from '../../../public/partners/accenture.svg'
import Autodesk from '../../../public/partners/autodesk.svg'
import Bekk from '../../../public/partners/bekk.svg'
import Bouvet from '../../../public/partners/bouvet.svg'
import Capra from '../../../public/partners/capra.svg'
import Cloudberries from '../../../public/partners/cloudberries.svg'
import Computas from '../../../public/partners/computas.svg'
import Digdir from '../../../public/partners/digdir.svg'
import DNB from '../../../public/partners/dnb.svg'
import ElOgIt from '../../../public/partners/elogit.svg'
import Embriq from '../../../public/partners/embriq.svg'
import Entur from '../../../public/partners/entur.svg'
import VEND from '../../../public/partners/finn.svg'
import Fremtind from '../../../public/partners/fremtind.svg'
import GE from '../../../public/partners/GE.svg'
import Gjensidige from '../../../public/partners/gjensidige.svg'
import Husbanken from '../../../public/partners/husbanken.svg'
import Itera from '../../../public/partners/itera.svg'
import JPRO from '../../../public/partners/jpro.svg'
import Kantega from '../../../public/partners/kantega.svg'
import Kartverket from '../../../public/partners/kartverket.svg'
import KLP from '../../../public/partners/klp.svg'
import Knowit from '../../../public/partners/knowit.svg'
import KSDigitaleFellestjenester from '../../../public/partners/ks-digitale-fellestjenester.svg'
import L321 from '../../../public/partners/L321.svg'
import NAV from '../../../public/partners/nav.svg'
import PolitietPIT from '../../../public/partners/politietpit.svg'
import PostenBring from '../../../public/partners/postenbring.svg'
import Randstad from '../../../public/partners/randstad-digital.svg'
import Scelto from '../../../public/partners/scelto.svg'
import Scienta from '../../../public/partners/scienta.svg'
import Skatteetaten from '../../../public/partners/skatteetaten.svg'
import SopraSteria from '../../../public/partners/soprasteria.svg'
import Sparebank1 from '../../../public/partners/sparebank1.svg'
import SSB from '../../../public/partners/ssb.svg'
import StatensVegvesen from '../../../public/partners/statensvegvesen.svg'
import STOE from '../../../public/partners/stoe.svg'
import Storebrand from '../../../public/partners/storebrand.svg'
import Systek from '../../../public/partners/systek.svg'
import Telenor from '../../../public/partners/telenor.svg'
import Tietobanktech from '../../../public/partners/tietobanktech.svg'
import Tolletaten from '../../../public/partners/tolletaten.svg'
import Tomra from '../../../public/partners/tomra.svg'
import Vaadin from '../../../public/partners/vaadin.svg'
import VY from '../../../public/partners/vy.svg'
import Webstep from '../../../public/partners/webstep.svg'

interface Partner {
  name: string
  homepageUrl: string
  logoUrl: string
}

export const partners: Partner[] = [
  { name: '321', homepageUrl: 'https://www.321.no/', logoUrl: L321 },
  { name: 'Accenture', homepageUrl: 'https://www.accenture.com', logoUrl: Accenture },
  { name: 'Autodesk', homepageUrl: 'https://www.autodesk.com/no', logoUrl: Autodesk },
  { name: 'Bekk', homepageUrl: 'https://www.bekk.no', logoUrl: Bekk },
  { name: 'Bouvet', homepageUrl: 'https://www.bouvet.no', logoUrl: Bouvet },
  { name: 'Capra', homepageUrl: 'https://www.capraconsulting.no', logoUrl: Capra },
  // { name: 'CGI', homepageUrl: 'https://www.cgi.com', logoUrl: CGI },
  { name: 'Cloudberries', homepageUrl: 'https://www.cloudberries.no', logoUrl: Cloudberries },
  { name: 'Computas', homepageUrl: 'https://computas.com', logoUrl: Computas },
  { name: 'DNB', homepageUrl: 'https://www.dnb.no', logoUrl: DNB },
  { name: 'Embriq', homepageUrl: 'https://www.embriq.no', logoUrl: Embriq },
  { name: 'Entur', homepageUrl: 'https://www.entur.no', logoUrl: Entur },
  { name: 'Vend', homepageUrl: 'https://www.finn.no', logoUrl: VEND },
  { name: 'Fremtind', homepageUrl: 'https://www.fremtind.no', logoUrl: Fremtind },
  { name: 'Gjensidige', homepageUrl: 'https://www.gjensidige.no', logoUrl: Gjensidige },
  { name: 'Husbanken', homepageUrl: 'https://www.husbanken.no', logoUrl: Husbanken },
  { name: 'Kantega', homepageUrl: 'https://www.kantega.no', logoUrl: Kantega },
  { name: 'Knowit', homepageUrl: 'https://www.knowit.no', logoUrl: Knowit },
  { name: 'Posten Bring', homepageUrl: 'https://www.bring.no', logoUrl: PostenBring },
  { name: 'Randstad', homepageUrl: 'https://www.randstad.no', logoUrl: Randstad },
  // { name: 'Red Hat', homepageUrl: 'https://www.redhat.com', logoUrl: RedHat },
  { name: 'Scelto', homepageUrl: 'https://www.scelto.no', logoUrl: Scelto },
  { name: 'Scienta', homepageUrl: 'https://www.scienta.no', logoUrl: Scienta },
  { name: 'Skatteetaten', homepageUrl: 'https://www.skatteetaten.no', logoUrl: Skatteetaten },
  { name: 'Sopra Steria', homepageUrl: 'https://www.soprasteria.no', logoUrl: SopraSteria },
  { name: 'Sparebank-1', homepageUrl: 'https://www.sparebank1.no', logoUrl: Sparebank1 },
  { name: 'Statens Vegvesen', homepageUrl: 'https://www.vegvesen.no', logoUrl: StatensVegvesen },
  { name: 'Storebrand', homepageUrl: 'https://www.storebrand.no', logoUrl: Storebrand },
  { name: 'Systek', homepageUrl: 'https://www.systek.no', logoUrl: Systek },
  { name: 'Telenor', homepageUrl: 'https://www.telenor.no', logoUrl: Telenor },
  { name: 'Tieto banchtech', homepageUrl: 'https://www.tieto.com/en/banktech', logoUrl: Tietobanktech },
  { name: 'Tolletaten', homepageUrl: 'https://www.toll.no', logoUrl: Tolletaten },
  { name: 'Tomra', homepageUrl: 'https://www.tomra.com', logoUrl: Tomra },
  { name: 'Vaadin', homepageUrl: 'https://vaadin.com', logoUrl: Vaadin },
  { name: 'Webstep', homepageUrl: 'https://www.webstep.no', logoUrl: Webstep },
  { name: 'El og IT', homepageUrl: 'https://elogit.no', logoUrl: ElOgIt },
  { name: 'GE', homepageUrl: 'https://www.gevernova.com', logoUrl: GE },
  { name: 'JPRO', homepageUrl: 'https://www.jpro.no', logoUrl: JPRO },
  { name: 'NAV', homepageUrl: 'https://www.nav.no', logoUrl: NAV },
  { name: 'KS Digitale Fellestjenester', homepageUrl: 'https://ksdigital.no/', logoUrl: KSDigitaleFellestjenester },
  { name: 'Kartverket', homepageUrl: 'https://www.kartverket.no', logoUrl: Kartverket },
  { name: 'SSB', homepageUrl: 'https://www.ssb.no', logoUrl: SSB },
  { name: 'STØ', homepageUrl: 'https://stoe.no/', logoUrl: STOE },
  { name: 'Politiet PIT', homepageUrl: 'https://www.politiet.no', logoUrl: PolitietPIT },
  { name: 'Itera', homepageUrl: 'https://www.itera.no', logoUrl: Itera },
  { name: 'KLP', homepageUrl: 'https://www.klp.no', logoUrl: KLP },
  { name: 'Digdir', homepageUrl: 'https://www.digdir.no', logoUrl: Digdir },
  { name: 'Vy', homepageUrl: 'https://www.vy.no', logoUrl: VY },
]
