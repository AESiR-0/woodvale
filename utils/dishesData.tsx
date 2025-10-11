export interface Dish {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  mainImage: string;
  number: number;
  rating: number;
  chef: string;
  chefTitle: string;
  description: string;
}

export type CategoryType = "food" | "drinks" | "reviews";

export const categories: Record<CategoryType, Dish[]> = {
  food: [
    {
      id: 1,
      name: "Soto ayah",
      subtitle: "pek oetin",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop",
      number: 1,
      rating: 4.5,
      chef: "Chef Ahmad",
      chefTitle: "Indonesian Cuisine Expert",
      description:
        "Traditional Indonesian soup with rich aromatic spices, tender chicken, and fresh herbs. A comfort food that warms your soul.",
    },
    {
      id: 2,
      name: "LAMB STEAK",
      subtitle: "POTATO",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop",
      number: 2,
      rating: 4.3,
      chef: "Chef K Semy",
      chefTitle: "Konsultas Pastos Recor",
      description:
        "Dosen pemberitungku kok eram tenen ye sik, misrok tet wlung ru toko teks aull aull",
    },
    {
      id: 3,
      name: "Muncibuk",
      subtitle: "pek oetin",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      number: 3,
      rating: 4.7,
      chef: "Chef Maria",
      chefTitle: "Fusion Cuisine Specialist",
      description:
        "Expertly crafted fusion dish combining traditional flavors with modern techniques. A perfect balance of taste and presentation.",
    },
  ],
  drinks: [
    {
      id: 6,
      name: "Red Wine",
      subtitle: "Cabernet",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop",
      number: 1,
      rating: 4.8,
      chef: "Sommelier Jean",
      chefTitle: "Wine Expert",
      description:
        "Full-bodied red wine with notes of blackcurrant and oak. Perfect pairing with red meats and aged cheeses.",
    },
    {
      id: 7,
      name: "Mojito",
      subtitle: "Classic",
      image:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&h=600&fit=crop",
      number: 2,
      rating: 4.6,
      chef: "Bartender Mike",
      chefTitle: "Mixology Specialist",
      description:
        "Refreshing cocktail with fresh mint, lime, and rum. The perfect drink for a hot summer day.",
    },
    {
      id: 8,
      name: "Espresso",
      subtitle: "Double Shot",
      image:
        "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
      mainImage:
        "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=600&fit=crop",
      number: 3,
      rating: 4.9,
      chef: "Barista Anna",
      chefTitle: "Coffee Artisan",
      description:
        "Rich and intense espresso made from premium arabica beans. Bold flavor with a smooth finish.",
    },
  ],
  reviews: [],
};
