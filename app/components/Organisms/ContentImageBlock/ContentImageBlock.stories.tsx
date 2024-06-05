import type { Meta, StoryObj } from '@storybook/react'

import ContentImageBlock from './ContentImageBlock'

const meta = {
  title: 'Organisms/ContentImageBlock',
  component: ContentImageBlock,
  tags: ['autodocs'],
  args: {
    background: 'black',
    eyelet: 'approfondimento',
    preTitle: 'A proposito di',
    title: 'Alle radici del cielo',
    logo: true,
    image: 'https://picsum.photos/607/625',
    button: {
      to: '/',
      label: 'dowload kit',
      icon: 'DownloadSimple',
    },
    content:
      "Come si fa a mettere radici dove non crescono più nemmeno gli alberi? L’Oreste’s Hutte, un rifugio alpino situato a 2600 metri di altitudine, è unico nel suo genere: fuori pista, aperto anche in inverno, è gestito dalla famiglia Squinobal, che ha scelto di vivere la montagna in modo diverso. L'alimentazione è vegana, l'energia prodotta proviene da fonti rinnovabili e si trova fuori dalle piste, per rispettare il più possibile l'ambiente selvaggio in cui si trova. Attraverso la storia del rifugio, il documentario segue Arturo, il papà, Oreste, lo zio a cui il rifugio è dedicato, due grandi alpinisti che hanno scritto alcune delle pagine dell'alpinismo, dalla Valle d'Aosta al Nepal; ma anche di Franca, la mamma, e di Emil e Marta, i figli, con le rispettive famiglie, che contribuiscono alla vita di questo luogo diverso da tutti gli altri.  In un momento di emergenza climatica, dove i ghiacciai si stanno sciogliendo, ci insegnano che dobbiamo ripensare il nostro rapporto con la montagna.",
  },
} satisfies Meta<typeof ContentImageBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    background: 'black',
    eyelet: 'approfondimento',
    preTitle: 'A proposito di',
    title: 'Alle radici del cielo',
    logo: true,
    image: 'https://picsum.photos/607/625',
    button: {
      to: '/',
      label: 'dowload kit',
      icon: 'DownloadSimple',
    },
    content:
      "Come si fa a mettere radici dove non crescono più nemmeno gli alberi? L’Oreste’s Hutte, un rifugio alpino situato a 2600 metri di altitudine, è unico nel suo genere: fuori pista, aperto anche in inverno, è gestito dalla famiglia Squinobal, che ha scelto di vivere la montagna in modo diverso. L'alimentazione è vegana, l'energia prodotta proviene da fonti rinnovabili e si trova fuori dalle piste, per rispettare il più possibile l'ambiente selvaggio in cui si trova. Attraverso la storia del rifugio, il documentario segue Arturo, il papà, Oreste, lo zio a cui il rifugio è dedicato, due grandi alpinisti che hanno scritto alcune delle pagine dell'alpinismo, dalla Valle d'Aosta al Nepal; ma anche di Franca, la mamma, e di Emil e Marta, i figli, con le rispettive famiglie, che contribuiscono alla vita di questo luogo diverso da tutti gli altri.  In un momento di emergenza climatica, dove i ghiacciai si stanno sciogliendo, ci insegnano che dobbiamo ripensare il nostro rapporto con la montagna.",
  },
}
