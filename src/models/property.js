const mongoose = require('mongoose');
const { PropertyAmenities } = require('./secondary_models/propertyAmenities');
const { Address } = require('./secondary_models/address');
const AddressSchema = require('./secondary_models/address').AddressSchema;
const PhotoSchema = require('./secondary_models/photo').PhotoSchema;
const VideoSchema = require('./secondary_models/video').VideoSchema;
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
 *         - bedrooms_count
 *         - bathrooms_count
 *         - has_kitchen
 *         - total_beds
 *         - bathroom_amenities
 *         - bedroom_amenities
 *         - kitchen_amenities
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
 *         bedrooms_count:
 *           type: number
 *           description: Number of bedrooms
 *         bathrooms_count:
 *           type: number
 *           description: Number of bathrooms
 *         has_kitchen:
 *           type: boolean
 *           description: Indicates if the property has a kitchen
 *         total_beds:
 *           type: number
 *           description: Total number of beds
 *         bathroom_amenities:
 *           type: object
 *           properties:
 *             essentials:
 *               type: boolean
 *               description: Indicates if the property has bathroom essentials
 *             shampoo:
 *               type: boolean
 *               description: Indicates if the property has shampoo
 *             hair_dryer:
 *               type: boolean
 *               description: Indicates if the property has a hair dryer
 *             hot_water:
 *               type: boolean
 *               description: Indicates if the property has hot water
 *         bedroom_amenities:
 *           type: object
 *           properties:
 *             bed_linens:
 *               type: boolean
 *               description: Indicates if the property has bed linens
 *             extra_pillows:
 *               type: boolean
 *               description: Indicates if the property has extra pillows
 *             wardrobe:
 *               type: boolean
 *               description: Indicates if the property has a wardrobe
 *             blackout_curtains:
 *               type: boolean
 *               description: Indicates if the property has blackout curtains
 *         kitchen_amenities:
 *           type: object
 *           properties:
 *             refrigerator:
 *               type: boolean
 *               description: Indicates if the property has a refrigerator
 *             microwave:
 *               type: boolean
 *               description: Indicates if the property has a microwave
 *             cooking_basics:
 *               type: boolean
 *               description: Indicates if the property has cooking basics
 *             dishes_utensils:
 *               type: boolean
 *               description: Indicates if the property has dishes and utensils
 *             stove:
 *               type: boolean
 *               description: Indicates if the property has a stove
 *             oven:
 *               type: boolean
 *               description: Indicates if the property has an oven
 *             coffee_maker:
 *               type: boolean
 *               description: Indicates if the property has a coffee maker
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
 *         bedrooms_count: 2
 *         bathrooms_count: 1
 *         has_kitchen: true
 *         total_beds: 3
 *         bathroom_amenities:
 *           essentials: true
 *           shampoo: true
 *           hair_dryer: true
 *           hot_water: true
 *         bedroom_amenities:
 *           bed_linens: true
 *           extra_pillows: true
 *           wardrobe: true
 *           blackout_curtains: true
 *         kitchen_amenities:
 *           refrigerator: true
 *           microwave: true
 *           cooking_basics: true
 *           dishes_utensils: true
 *           stove: true
 *           oven: true
 *           coffee_maker: true
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
  bedrooms_count: { 
    type: Number, 
    required: false,
    default: 0,
    min: 0 
  },
  bathrooms_count: { 
    type: Number, 
    required: false,
    default: 0,
    min: 0 
  },
  has_kitchen: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  total_beds: { 
    type: Number, 
    required: false,
    default: 0,
    min: 0 
  },
  bathroom_amenities: {
    essentials: { type: Boolean, required: false, default: false },
    shampoo: { type: Boolean, required: false, default: false },
    hair_dryer: { type: Boolean, required: false, default: false },
    hot_water: { type: Boolean, required: false, default: false }
  },
  bedroom_amenities: {
    bed_linens: { type: Boolean, required: false, default: false },
    extra_pillows: { type: Boolean, required: false, default: false },
    wardrobe: { type: Boolean, required: false, default: false },
    blackout_curtains: { type: Boolean, required: false, default: false }
  },
  kitchen_amenities: {
    refrigerator: { type: Boolean, required: false, default: false },
    microwave: { type: Boolean, required: false, default: false },
    cooking_basics: { type: Boolean, required: false, default: false },
    dishes_utensils: { type: Boolean, required: false, default: false },
    stove: { type: Boolean, required: false, default: false },
    oven: { type: Boolean, required: false, default: false },
    coffee_maker: { type: Boolean, required: false, default: false }
  },
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