import type { Meta, StoryObj } from '@storybook/react'

import HeroDirector from './HeroDirector'

const meta = {
  title: 'Organisms/HeroDirector',
  component: HeroDirector,
  args: {
    firstname: 'John',
    lastname: 'Chester',
    image: {
      src: 'https://picsum.photos/seed/picsum/1440/600',
      alt: 'alt',
      width: 1440,
    },
    directorInfo: [
      {
        data: 'Nazionalità',
        value: 'Lorem ipsum',
      },
      {
        data: 'Generi',
        value: 'Lorem ipsum',
      },
    ],
    bio: 'Disserui cuiquam praeclarorum arbitramur cupiditatibus severa videtisne iudex maiorum fames hostis Tite instructior suspicor Antipatrum laetetur reliquaque sua consentaneum postulet, Usus suppetet summum hominum legant augendas gerendarum Ennius cogitavisse centurionum nacti exedunt idem vivere! Epicurum utens error iustitiam fidem tertio porrecta horrent essent nescius praestabiliorem ambigua turpius sententiae. Scaevolam probaretur libidinibus tranquilli referenda defuturum inpotenti errata inopem gravioribus legendus pluribus nobis copiosae conducunt inmortalibus malivoli optinere. Putet intellegitur debilitati decore infinitum Multoque morte affecta lictores stultorum id ignota curiosi probarent aptissimum!  Istam inutile nati concordia mors aliquam faciant sublatum modice praeterea Latina. Inane nominis locos celeritas leniter varias ergo rogatiuncula impetu efficeret aliquos Sol maledici omnino. Turbulenta tenent nocet impediri torquentur Haec Ut meis causae vero habeo Quae morte utrisque ipsum gratia adhaesiones quo haec, Patientiamque Manilium pariant dividendo alterum cogitavisse intellegi novi veri Metrodorus asperner illis salutandi carere Latinas discordans proprius consequamur, Possent nullus responsum erat vidit mala terrore possimus corrumpit. Oriantur Epicurus vi placeat perspicuum effugiendorum erat alliciat paene mererer Caecilii perpetiuntur. Alii gustare provident labefactant doceat incursione videantur vituperatum faciam allicit permagna inviti privamur ita medicorum! Allicit secundum vester vitae explicatam extremo ac Id nescius rogatiuncula monet ego Euripidis Mucius erigimur conficiuntque intellegam morbos impediri corporum incidant. Reliquarum impendet eram sentio solvantur fortitudinis Democriti dixeris parentes interesset praetermittenda Cyrenaicos contentus civitatis Iam horrent expleantur. Suum audivi spe apeirian veritus numen salutandi aiebat una eitam dixi quaedam vulgo dominos quadam privamur dicemus eamque maiora istae difficilius honeste torquentur! Vituperatoribus maximi vero elaborare recte propemodum sicut vulgo naturae possit pacem intellegere patiatur labitur quas imitarentur ignavi prorsus harum infinitis. Aliquos Panaetium inertissimae angusti intellegerem emancipaverat physico essent praeteritas volunt accedis certa laetamur liberavisse vexetur?',
  },
} satisfies Meta<typeof HeroDirector>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    firstname: 'John',
    lastname: 'Chester',
    image: {
      src: 'https://picsum.photos/seed/picsum/1440/600',
      alt: 'alt',
      width: 1440,
    },
    directorInfo: [
      {
        data: 'Nazionalità',
        value: 'Lorem ipsum',
      },
      {
        data: 'Generi',
        value: 'Lorem ipsum',
      },
    ],
    bio: 'Disserui cuiquam praeclarorum arbitramur cupiditatibus severa videtisne iudex maiorum fames hostis Tite instructior suspicor Antipatrum laetetur reliquaque sua consentaneum postulet, Usus suppetet summum hominum legant augendas gerendarum Ennius cogitavisse centurionum nacti exedunt idem vivere! Epicurum utens error iustitiam fidem tertio porrecta horrent essent nescius praestabiliorem ambigua turpius sententiae. Scaevolam probaretur libidinibus tranquilli referenda defuturum inpotenti errata inopem gravioribus legendus pluribus nobis copiosae conducunt inmortalibus malivoli optinere. Putet intellegitur debilitati decore infinitum Multoque morte affecta lictores stultorum id ignota curiosi probarent aptissimum!  Istam inutile nati concordia mors aliquam faciant sublatum modice praeterea Latina. Inane nominis locos celeritas leniter varias ergo rogatiuncula impetu efficeret aliquos Sol maledici omnino. Turbulenta tenent nocet impediri torquentur Haec Ut meis causae vero habeo Quae morte utrisque ipsum gratia adhaesiones quo haec, Patientiamque Manilium pariant dividendo alterum cogitavisse intellegi novi veri Metrodorus asperner illis salutandi carere Latinas discordans proprius consequamur, Possent nullus responsum erat vidit mala terrore possimus corrumpit. Oriantur Epicurus vi placeat perspicuum effugiendorum erat alliciat paene mererer Caecilii perpetiuntur. Alii gustare provident labefactant doceat incursione videantur vituperatum faciam allicit permagna inviti privamur ita medicorum! Allicit secundum vester vitae explicatam extremo ac Id nescius rogatiuncula monet ego Euripidis Mucius erigimur conficiuntque intellegam morbos impediri corporum incidant. Reliquarum impendet eram sentio solvantur fortitudinis Democriti dixeris parentes interesset praetermittenda Cyrenaicos contentus civitatis Iam horrent expleantur. Suum audivi spe apeirian veritus numen salutandi aiebat una eitam dixi quaedam vulgo dominos quadam privamur dicemus eamque maiora istae difficilius honeste torquentur! Vituperatoribus maximi vero elaborare recte propemodum sicut vulgo naturae possit pacem intellegere patiatur labitur quas imitarentur ignavi prorsus harum infinitis. Aliquos Panaetium inertissimae angusti intellegerem emancipaverat physico essent praeteritas volunt accedis certa laetamur liberavisse vexetur?',
  },
}
