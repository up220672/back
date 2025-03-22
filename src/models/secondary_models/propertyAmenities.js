const mongoose = require('mongoose');

const PropertyAmenitiesSchema = new mongoose.Schema({
  wifi: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  panoramic_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bay_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  city_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  mountain_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  lake_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  garden_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  pool_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  beach_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  forest_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  ocean_view: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  cleaning_service: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  laundry_service: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  laundry_room: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  iron: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  ironing_board: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  washing_machine: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  dryer: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  safe_box: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  security_system: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  fire_extinguisher: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  outdoor_furniture: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bbq_grill: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  private_pool: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  shared_pool: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  private_gym: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  shared_gym: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  sauna: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  jacuzzi: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  sun_loungers: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  hammock: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  fire_pit: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  gazebo: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  elevator: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  private_parking: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  street_parking: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  garage: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  bike_storage: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  private_entrance: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  wheelchair_accessible: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  pets_allowed: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  smoking_allowed: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  events_allowed: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  children_allowed: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  first_aid_kit: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  smoke_detector: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  carbon_monoxide_detector: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  balcony: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  terrace: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  garden: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  spa: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  library_room: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  cinema_room: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  game_room: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  music_room: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  office: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  ping_pong_table: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  pool_table: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  children_play_area: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  tennis_court: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  basketball_court: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  soccer_field: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  volleyball_court: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  golf_course: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  mini_golf: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  beach_access: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  lake_access: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  river_access: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  printer: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  scanner: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  pet_friendly: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  kid_friendly: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  elderly_friendly: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  electric_vehicle_charging_station: { 
    type: Boolean, 
    required: false,
    default: false 
  }
}, { versionKey: false });

const PropertyAmenities = mongoose.model('PropertyAmenities', PropertyAmenitiesSchema);

module.exports = { PropertyAmenities, PropertyAmenitiesSchema };