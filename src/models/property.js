const mongoose = require('mongoose');
const { PropertyAmenities } = require('./secondary_models/propertyAmenities');
const { Address } = require('./secondary_models/address');
const AddressSchema = require('./secondary_models/address').AddressSchema;
const PhotoSchema = require('./secondary_models/photo').PhotoSchema;
const VideoSchema = require('./secondary_models/video').VideoSchema;
const BedroomSchema = require('./secondary_models/bedroom').BedroomSchema;
const KitchenSchema = require('./secondary_models/kitchen').KitchenSchema;
const BathroomSchema = require('./secondary_models/bathroom').BathroomSchema;
const PropertyAmenitiesSchema = require('./secondary_models/propertyAmenities').PropertyAmenitiesSchema;
const ReviewSchema = require('./secondary_models/review').ReviewSchema;


/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - type
 *         - max_guests
 *         - width
 *         - length
 *         - address
 *         - check_in
 *         - check_out
 *         - min_stay_nights
 *         - max_stay_nights
 *         - price_per_night
 *         - currency
 *         - is_active
 *         - title
 *         - markdown_description
 *         - max_babies
 *         - proof_of_address
 *         - is_proof_of_address_verified
 *         - land_use_permit
 *         - is_land_use_permit_verified
 *         - bedrooms
 *         - kitchens
 *       properties:
 *         is_active:
 *           type: boolean
 *           description: Indicates if the property is active
 *         type:
 *           type: number
 *           description: Type of the property
 *         title:
 *           type: string
 *           description: Title of the property
 *         markdown_description:
 *           type: string
 *           description: Description of the property in markdown format
 *         max_guests:
 *           type: number
 *           description: Maximum number of guests
 *         max_babies:
 *           type: number
 *           description: Maximum number of babies
 *         proof_of_address:
 *           type: string
 *           description: Proof of address
 *         is_proof_of_address_verified:
 *           type: boolean
 *           description: Indicates if the proof of address is verified
 *         land_use_permit:
 *           type: string
 *           description: Land use permit
 *         is_land_use_permit_verified:
 *           type: boolean
 *           description: Indicates if the land use permit is verified
 *         bedrooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Bedroom'
 *           description: List of bedrooms
 *         kitchens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Kitchen'
 *           description: List of kitchens
 *         bathrooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Bathroom'
 *           description: List of bathrooms
 *         width:
 *           type: number
 *           description: Width of the property
 *         length:
 *           type: number
 *           description: Length of the property
 *         address:
 *           $ref: '#/components/schemas/Address'
 *           description: Address of the property
 *         photos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *           description: List of photos
 *         videos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Video'
 *           description: List of videos
 *         views:
 *           type: number
 *           description: Number of views
 *         amenities:
 *           $ref: '#/components/schemas/PropertyAmenities'
 *           description: Amenities of the property
 *         check_in:
 *           type: number
 *           description: Check-in time in minutes from midnight
 *         check_out:
 *           type: number
 *           description: Check-out time in minutes from midnight
 *         min_stay_nights:
 *           type: number
 *           description: Minimum number of stay nights
 *         max_stay_nights:
 *           type: number
 *           description: Maximum number of stay nights
 *         price_per_night:
 *           type: number
 *           description: Price per night
 *         currency:
 *           type: string
 *           description: Currency of the price
 *         rules:
 *           type: array
 *           items:
 *             type: string
 *           description: List of rules
 *         preparation_days_time_between_stays:
 *           type: number
 *           description: Preparation days time between stays
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *           description: List of reviews
 *       example:
 *         is_active: true
 *         type: 1
 *         title: "Beautiful Beach House"
 *         markdown_description: "A beautiful house by the beach with stunning views."
 *         max_guests: 4
 *         max_babies: 1
 *         proof_of_address: "123 Beach Ave"
 *         is_proof_of_address_verified: true
 *         land_use_permit: "Permit123"
 *         is_land_use_permit_verified: true
 *         bedrooms: [{...}]
 *         kitchens: [{...}]
 *         bathrooms: [{...}]
 *         width: 10
 *         length: 20
 *         address: { ... }
 *         photos: [{...}]
 *         videos: [{...}]
 *         views: 100
 *         amenities: { ... }
 *         check_in: 720
 *         check_out: 720
 *         min_stay_nights: 2
 *         max_stay_nights: 30
 *         price_per_night: 100
 *         currency: "USD"
 *         rules: ["No smoking", "No pets"]
 *         preparation_days_time_between_stays: 1
 *         reviews: [{...}]
 */


const PropertySchema = new mongoose.Schema({
  is_active: { 
    type: Boolean, 
    required: false,
    default: true 
  },
  type: { 
    type: Number, 
    required: true 
  },
  is_approved: {
    type: Boolean,
    required: false,
    default: false
  },
  title: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  markdown_description: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  max_guests: { 
    type: Number, 
    required: true,
    min: 1 
  },
  max_babies: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  proof_of_address: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_proof_of_address_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  land_use_permit: { 
    type: String, 
    required: false,
    default: null,
    trim: true 
  },
  is_land_use_permit_verified: { 
    type: Boolean, 
    required: false,
    default: null 
  },
  bedrooms: [{ 
    type: BedroomSchema, 
    required: false
  }],
  kitchens: [{ 
    type: KitchenSchema, 
    required: false,
    default: null 
  }],
  bathrooms: [{ 
    type: BathroomSchema, 
    required: false
  }],
  width: { 
    type: Number, 
    required: true,
    min: 1
  },
  length: { 
    type: Number, 
    required: true,
    min: 1
  },
  address: { 
    type: AddressSchema, 
    required: true,
    default: Address()
  },
  photos: [{ 
    type: PhotoSchema, 
    required: false,
    default: null 
  }],
  videos: [{ 
    type: VideoSchema, 
    required: false,
    default: null 
  }],
  views: { 
    type: Number, 
    required: false,
    default: 0,
    min: 0 
  },
  amenities: { 
    type: PropertyAmenitiesSchema, 
    required: false,
    default: PropertyAmenities() 
  },
  check_in: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1440 
  },
  check_out: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1440 
  },
  min_stay_nights: { 
    type: Number, 
    required: true,
    min: 1 
  },
  max_stay_nights: { 
    type: Number, 
    required: true,
    min: 1 
  },
  price_per_night: { 
    type: Number, 
    required: true,
    min: 0 
  },
  currency: { 
    type: String, 
    required: true,
    trim: true 
  },
  rules: [{ 
    type: String, 
    required: false,
    default: null,
    trim: true 
  }],
  preparation_days_time_between_stays: { 
    type: Number, 
    required: false,
    default: null,
    min: 0 
  },
  reviews: [{ 
    type: ReviewSchema, 
    required: false,
    default: null 
  }]
}, { versionKey: false });

const Property = mongoose.model('Property', PropertySchema);

module.exports = { Property, PropertySchema };