export const amenityGroups = [
  { title: "Scenic views", items: ["Ocean view", "Garden view", "Beach view"] },
  { title: "Bathroom", items: ["Bathtub", "Hair dryer", "Cleaning products", "Bidet", "Outdoor shower", "Hot water"] },
  { title: "Bedroom & laundry", items: ["Washer", "Free dryer in the building", "Essentials", "Hangers", "Bed linens", "Extra pillows and blankets", "Room-darkening shades", "Iron", "Drying rack", "Safe", "Closet storage"] },
  { title: "Entertainment", items: ["Premium cable TV", "Bluetooth and aux sound system", "Arcade games", "Books and reading material"] },
  { title: "Family", items: ["Crib on request", "Children’s books and toys", "Board games"] },
  { title: "Cooling", items: ["Central air conditioning", "Window AC unit", "Ceiling fan"] },
  { title: "Home safety", items: ["Exterior security cameras", "Smoke alarm", "Fire extinguisher", "First aid kit"] },
  { title: "Internet", items: ["Wi-Fi"] },
  { title: "Kitchen & dining", items: ["Kitchen", "Refrigerator", "Microwave", "Cooking basics", "Dishes and silverware", "Freezer", "Dishwasher", "Gas stove", "Stainless-steel oven", "Hot-water kettle", "Nespresso coffee maker", "Wine glasses", "Toaster", "Barbecue utensils", "Dining table", "Coffee", "Bread maker"] },
  { title: "Location features", items: ["Waterfront", "Private beachfront access", "Private entrance"] },
  { title: "Outdoor", items: ["Fully fenced private backyard", "Outdoor furniture", "Outdoor dining area", "BBQ grill", "Sun loungers"] },
  { title: "Parking & facilities", items: ["Free parking on premises", "Free street parking", "Pool", "Single-level home"] },
  { title: "Services", items: ["Long-term stays allowed", "Self check-in", "Lockbox", "Cleaning available during the stay"] },
] as const;

export const amenityCount = amenityGroups.reduce((total, group) => total + group.items.length, 0);
