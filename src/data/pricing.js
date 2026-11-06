export const pricingData = {
  currencySymbol: "₹",
  depositInr: 1500,
  minInr: 2500,
  touchupGuarantee: "Free touch-up within 3 months",
  sizeStrips: [
    {
      inches: 1,
      reference: "1 in = coin",
      startingPriceInr: 2500,
      note: "Session minimum"
    },
    {
      inches: 2,
      reference: "2 in = matchbox",
      startingPriceInr: 3500,
      note: "Micro flash / initials"
    },
    {
      inches: 3,
      reference: "3 in = credit card",
      startingPriceInr: 5500,
      note: "Wrist / ankle motif"
    },
    {
      inches: 4,
      reference: "4 in = palm",
      startingPriceInr: 8000,
      note: "Standard flash piece"
    },
    {
      inches: 6,
      reference: "6 in = phone",
      startingPriceInr: 12000,
      note: "Forearm / calf focal"
    },
    {
      inches: 8,
      reference: "8 in = forearm span",
      startingPriceInr: 18000,
      note: "Large custom piece"
    }
  ],
  largeWork: [
    {
      name: "Half Sleeve",
      size: "10 – 12 in",
      startingPriceInr: 30000,
      note: "Multi-session planning"
    },
    {
      name: "Full Sleeve",
      size: "18 – 24 in",
      startingPriceInr: 55000,
      note: "Dedicated custom mapping"
    },
    {
      name: "Full Back Piece",
      size: "Full Canvas",
      startingPriceInr: null,
      note: "Quoted after private consult"
    }
  ],
  ratesPerInch: {
    "Fine Line": 1800,
    "Black & Grey": 2200,
    "Blackwork": 2000,
    "Realism": 3200,
    "Traditional": 2400
  },
  notes: [
    {
      title: "Deposit ₹1,500",
      desc: "Secures your studio date and custom drawing time. Deducted directly from your final invoice on tattoo day."
    },
    {
      title: "Session Minimum ₹2,500",
      desc: "Covers single-use surgical steel needles, sterile barrier setup, premium vegan inks, and medical-grade hygiene."
    },
    {
      title: "Free Touch-Up (3 Months)",
      desc: "Healing happens in the skin. If any line settles unevenly, return within 90 days for a complimentary refinement."
    }
  ]
};
