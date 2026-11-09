const reelMockupSources = [
  "https://images.unsplash.com/photo-1594091186701-13cd25dfda73?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://plus.unsplash.com/premium_photo-1707086194263-8ae88d647df7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1695226304152-931956f4a474?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://plus.unsplash.com/premium_photo-1722686455050-290ed7fb810e?q=80&w=411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1718661426798-208d614f4f1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://plus.unsplash.com/premium_photo-1726754489925-60ccbcbf5510?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1564426622559-5af68da63b96?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1704345911258-2b77b8f95588?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1748048317685-b7e2dc391c7c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
];

export const images = {
  hero: {
    src: "/temp/hero.webp",
    alt: "Solo tattoo artist Mira crafting a custom fine line piece in her private studio",
    position: "50% 35%",
    aspect: "16 / 10",
  },
  artist01: {
    src: "https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Portrait of tattoo artist Mira holding custom flash stencils",
    position: "50% 25%",
    aspect: "4 / 5",
  },
  artist02: {
    src: "https://images.unsplash.com/photo-1585303390830-874c989ce8f1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Artist Mira tattooing a client under studio lighting",
    position: "50% 40%",
    aspect: "4 / 5",
  },
  styles: {
    fineline: {
      src: reelMockupSources[0],
      alt: "Fine line botanical tattoo detailing on forearm",
      position: "50% 45%",
      aspect: "4 / 5",
    },
    blackgrey: {
      src: reelMockupSources[1],
      alt: "Smooth black and grey shaded classical sculpture tattoo",
      position: "50% 30%",
      aspect: "4 / 5",
    },
    blackwork: {
      src: reelMockupSources[2],
      alt: "Bold solid blackwork geometric and tribal-inspired piece",
      position: "50% 50%",
      aspect: "4 / 5",
    },
    realism: {
      src: reelMockupSources[3],
      alt: "Micro-realism portrait tattoo with subtle skin textures",
      position: "50% 40%",
      aspect: "4 / 5",
    },
    traditional: {
      src: reelMockupSources[4],
      alt: "Bold lined traditional panther and dagger design",
      position: "50% 50%",
      aspect: "4 / 5",
    },
  },
  flash: Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Mockup image for flash design No. ${num} by Mira`,
      position: "50% 50%",
      aspect: "1 / 1",
    };
  }),
  gallery: Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Custom tattoo piece No. ${num} completed by Mira`,
      position: "50% 45%",
      aspect: "4 / 5",
    };
  }),
  healed: [
    {
      fresh: {
        src: "/temp/before-1.webp",
        alt: "Fresh fine line serpent piece showing crisp stencil lines and redness",
        position: "50% 40%",
        aspect: "4 / 5",
      },
      healed: {
        src: "/temp/after-1.webp",
        alt: "Healed serpent tattoo 6 months later settled naturally into the dermis",
        position: "50% 40%",
        aspect: "4 / 5",
      },
    },
    {
      fresh: {
        src: "/temp/before-2.jpg",
        alt: "Fresh blackwork moth chest piece with deep saturated inks",
        position: "50% 50%",
        aspect: "4 / 5",
      },
      healed: {
        src: "/temp/after-2.jpg",
        alt: "Healed blackwork moth 6 months later with clean edges and smooth tones",
        position: "50% 50%",
        aspect: "4 / 5",
      },
    },
    {
      fresh: {
        src: "/temp/before-3.jpg",
        alt: "Fresh realism eye portrait on inner bicep with delicate white ink touches",
        position: "50% 35%",
        aspect: "4 / 5",
      },
      healed: {
        src: "/temp/after-3.jpg",
        alt: "Healed realism eye 6 months later showing soft contrast and no blowout",
        position: "50% 35%",
        aspect: "4 / 5",
      },
    },
  ],
  insta: Array.from({ length: 9 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Instagram snapshot No. ${num} from @mira.ink`,
      position: "50% 50%",
      aspect: "1 / 1",
    };
  }),
};
