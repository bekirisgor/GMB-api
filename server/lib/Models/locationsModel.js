const mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
  name: { type: String, index: { unique: true } },
  languageCode: String,
  storeCode: String,
  locationName: String,
  primaryPhone: String,
  additionalPhones: [String],
  address: {
    revision: Number,
    regionCode: String,
    languageCode: String,
    postalCode: String,
    sortingCode: String,
    administrativeArea: String,
    locality: String,
    sublocality: String,
    addressLines: [String],
    recipients: [String],
    organization: String
  },
  primaryCategory: {
    displayName: String,
    categoryId: String
  },
  additionalCategories: [
    {
      displayName: String,
      categoryId: String
    }
  ],
  websiteUrl: String,
  regularHours: {
    openDay: String,
    openTime: String,
    closeDay: String,
    closeTime: String
  },
  specialHours: {
    startDate: {
      year: Number,
      month: Number,
      day: Number
    },
    openTime: String,
    endDate: {
      year: Number,
      month: Number,
      day: Number
    },
    closeTime: String,
    isClosed: Boolean
  },
  serviceArea: {
    businessType: String,

    radius: {
      latlng: {
        latitude: Number,
        longitude: Number
      },
      radiusKm: Number
    },
    places: {
      name: String,
      placeId: String
    }
  },
  locationKey: {
    plusPageId: String,
    placeId: String,
    explicitNoPlaceId: Boolean,
    requestId: String
  },
  labels: [String],
  adWordsLocationExtensions: {
    adPhone: String
  },
  latlng: {
    latitude: Number,
    longitude: Number
  },
  openInfo: {
    status: String,
    canReopen: Boolean,
    openingDate: {
      year: Number,
      month: Number,
      day: Number
    }
  },
  locationState: {
    isGoogleUpdated: Boolean,
    isDuplicate: Boolean,
    isSuspended: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean,
    isVerified: Boolean,
    needsReverification: Boolean,
    isPendingReview: Boolean,
    isDisabled: Boolean,
    isPublished: Boolean,
    isDisconnected: Boolean,
    isLocalPostApiDisabled: Boolean,
    hasPendingEdits: Boolean,
    hasPendingVerification: Boolean
  },
  attributes: [
    {
      attributeId: String,
      valueType: String,
      values: [String],
      repeatedEnumValue: {
        setValues: [String],
        unsetValues: [String]
      },
      urlValues: [
        {
          url: String
        }
      ]
    }
  ],
  metadata: {
    duplicate: {
      locationName: String,
      placeId: String,
      access: String
    },
    mapsUrl: String,
    newReviewUrl: String
  },
  priceLists: [
    {
      priceListId: String,
      labels: [
        {
          displayName: String,
          description: String,
          languageCode: String
        }
      ],
      sourceUrl: String,
      sections: [
        {
          sectionId: String,
          labels: [
            {
              displayName: String,
              description: String,
              languageCode: String
            }
          ],
          sectionType: String,
          items: [
            {
              itemId: String,
              labels: [
                {
                  displayName: String,
                  description: String,
                  languageCode: String
                }
              ],
              price: {
                currencyCode: String,
                units: String,
                nanos: Number
              }
            }
          ]
        }
      ]
    }
  ],
  profile: {
    description: String
  },
  relationshipData: {
    parentChain: String
  }
});

module.exports = mongoose.model("locations", locationSchema);
