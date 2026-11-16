export const siteUrl = "https://joirush.com";

export function getAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(cleanPath);
  if (hasFileExtension) {
    return `${siteUrl}${cleanPath}`;
  }
  const trailingPath = cleanPath.endsWith("/") || cleanPath === "/" ? cleanPath : `${cleanPath}/`;
  return `${siteUrl}${trailingPath}`;
}

export function getImageUrl(imagePath: string): string {
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${siteUrl}${cleanPath}`;
}

// Shared Offer details for Product schema. Matches /shipping-returns/:
// free U.S. shipping, made to order and ships within 14 days, no returns
// on handmade to order pieces (damage is handled through the Contact page).
export const offerShippingDetails = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "US",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 14,
      unitCode: "DAY",
    },
  },
};

export const offerReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  merchantReturnLink: `${siteUrl}/shipping-returns/`,
};
