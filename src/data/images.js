const reelMockupSources = [
  "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1758404255679-9afd847ede1c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1741886516168-43bff0346f06?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1775134088833-c6989ed2938a?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1626983969036-c1ff8996c08b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://plus.unsplash.com/premium_photo-1677178690355-92838c3bd4ce?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1679621551066-ba0ee68b680a?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
];

export const images = {
  hero: {
    src: "/temp/hero.jpg",
    alt: "Solo tattoo artist Mira crafting a custom fine line piece in her private studio",
    position: "50% 35%",
    aspect: "16 / 10"
  },
  artist01: {
    src: "/temp/artist-01.jpg",
    alt: "Portrait of tattoo artist Mira holding custom flash stencils",
    position: "50% 25%",
    aspect: "4 / 5"
  },
  artist02: {
    src: "/temp/artist-02.jpg",
    alt: "Artist Mira tattooing a client under studio lighting",
    position: "50% 40%",
    aspect: "4 / 5"
  },
  styles: {
    fineline: {
      src: reelMockupSources[0],
      alt: "Fine line botanical tattoo detailing on forearm",
      position: "50% 45%",
      aspect: "4 / 5"
    },
    blackgrey: {
      src: reelMockupSources[1],
      alt: "Smooth black and grey shaded classical sculpture tattoo",
      position: "50% 30%",
      aspect: "4 / 5"
    },
    blackwork: {
      src: reelMockupSources[2],
      alt: "Bold solid blackwork geometric and tribal-inspired piece",
      position: "50% 50%",
      aspect: "4 / 5"
    },
    realism: {
      src: reelMockupSources[3],
      alt: "Micro-realism portrait tattoo with subtle skin textures",
      position: "50% 40%",
      aspect: "4 / 5"
    },
    traditional: {
      src: reelMockupSources[4],
      alt: "Bold lined traditional panther and dagger design",
      position: "50% 50%",
      aspect: "4 / 5"
    }
  },
  flash: Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Mockup image for flash design No. ${num} by Mira`,
      position: "50% 50%",
      aspect: "1 / 1"
    };
  }),
  gallery: Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Custom tattoo piece No. ${num} completed by Mira`,
      position: "50% 45%",
      aspect: "4 / 5"
    };
  }),
  healed: [
    {
      fresh: {
        src: reelMockupSources[0],
        alt: "Fresh fine line serpent piece showing crisp stencil lines and redness",
        position: "50% 40%",
        aspect: "4 / 5"
      },
      healed: {
        src: reelMockupSources[1],
        alt: "Healed serpent tattoo 6 months later settled naturally into the dermis",
        position: "50% 40%",
        aspect: "4 / 5"
      }
    },
    {
      fresh: {
        src: reelMockupSources[2],
        alt: "Fresh blackwork moth chest piece with deep saturated inks",
        position: "50% 50%",
        aspect: "4 / 5"
      },
      healed: {
        src: reelMockupSources[3],
        alt: "Healed blackwork moth 6 months later with clean edges and smooth tones",
        position: "50% 50%",
        aspect: "4 / 5"
      }
    },
    {
      fresh: {
        src: reelMockupSources[4],
        alt: "Fresh realism eye portrait on inner bicep with delicate white ink touches",
        position: "50% 35%",
        aspect: "4 / 5"
      },
      healed: {
        src: reelMockupSources[5],
        alt: "Healed realism eye 6 months later showing soft contrast and no blowout",
        position: "50% 35%",
        aspect: "4 / 5"
      }
    }
  ],
  insta: Array.from({ length: 9 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      src: reelMockupSources[i % reelMockupSources.length],
      alt: `Instagram snapshot No. ${num} from @mira.ink`,
      position: "50% 50%",
      aspect: "1 / 1"
    };
  })
};
