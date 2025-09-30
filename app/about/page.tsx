import Image from "next/image"
import Navbar from "@/components/Navbar"
import { Leaf, Heart, Users, Sprout } from "lucide-react"

export default function AboutPage() {
  const restaurant = {
    name: "WOODVALE",
    tagline: "Where Forest Meets Table",
    location: "Nestled in the Heart of the Valley",
    image: "/forest-restaurant-interior-with-warm-wood-tones-an.jpg",
    description:
      "At Woodvale, we believe that the best meals are those that connect us to the earth. Our forest-inspired dining experience brings together locally-sourced ingredients, sustainable practices, and the warmth of woodland hospitality. Every dish tells a story of the land, the seasons, and the farmers who nurture our ingredients with care.",
    mission:
      "Our mission is to create a dining sanctuary where guests can escape the rush of modern life and reconnect with nature through thoughtfully prepared, seasonal cuisine. We partner with local farmers and foragers to bring you the freshest ingredients, prepared with techniques that honor both tradition and innovation.",
    story:
      "Founded in 2020, Woodvale emerged from a simple dream: to create a restaurant that feels like a retreat into the forest. Our founders, inspired by childhood memories of family gatherings in woodland cabins, designed every aspect of Woodvale to evoke the peace and beauty of nature. From our reclaimed wood tables to our living plant walls, every detail invites you to slow down, savor, and celebrate the bounty of the earth.",
  }

  const values = [
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description:
        "We work exclusively with local farms practicing regenerative agriculture, ensuring every ingredient supports the health of our ecosystem.",
    },
    {
      icon: Heart,
      title: "Crafted with Care",
      description:
        "Our chefs treat each dish as a work of art, honoring the ingredients and the hands that grew them with meticulous attention to detail.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We're more than a restaurant—we're a gathering place where neighbors become friends and every meal is a celebration of togetherness.",
    },
    {
      icon: Sprout,
      title: "Seasonal Menus",
      description:
        "Our menu changes with the seasons, showcasing the best of what nature offers at each moment throughout the year.",
    },
  ]

  const team = [
    {
      name: "Elena Hartwood",
      role: "Founder & Head Chef",
      bio: "With over 15 years of culinary experience, Elena brings her passion for forest foraging and sustainable cooking to every dish at Woodvale.",
      image: "/chef-preparing-food-with-fresh-foraged-ingredients.jpg",
    },
    {
      name: "Marcus Pine",
      role: "Co-Founder & Sommelier",
      bio: "Marcus curates our wine selection with a focus on organic and biodynamic vineyards that share our commitment to the land.",
      image: "/wild-mushrooms-foraged-from-forest-floor.jpg",
    },
    {
      name: "Sofia Greenleaf",
      role: "Pastry Chef",
      bio: "Sofia's desserts celebrate the sweetness of nature, incorporating wild berries, honey, and herbs from our garden.",
      image: "/fresh-herbs-and-edible-flowers-on-wooden-cutting-b.jpg",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2A332D" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* <Image
          src={restaurant.image || "/placeholder.svg"}
          alt="Woodvale Restaurant"
          fill
          className="object-cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-[#2A332D]/90" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 text-balance">{restaurant.name}</h1>
          <p className="text-lg text-white/80">{restaurant.location}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24" style={{ backgroundColor: "#2A332D" }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Our Philosophy</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">{restaurant.description}</p>
            <p className="text-lg text-white/80 leading-relaxed">{restaurant.mission}</p>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/farm-to-table-fresh-vegetables-and-herbs.jpg"
              alt="Fresh ingredients"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#2A332D" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-white mb-4">What We Stand For</h2>
          <p className="text-center text-white/70 text-lg mb-12 max-w-2xl mx-auto">
            Our values guide every decision we make, from sourcing to service
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24" style={{ backgroundColor: "#2A332D" }}>
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8">Our Story</h2>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src="/cozy-forest-cabin-dining-room-with-wooden-tables.jpg"
              alt="Woodvale story"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-lg text-white/80 leading-relaxed text-pretty">{restaurant.story}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Visit Us</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We'd love to welcome you to Woodvale. Come experience our forest-inspired dining for yourself.
          </p>
          <button className="px-8 py-3 bg-primary-foreground text-primary rounded-md hover:bg-primary/90 hover:text-white border-1 transition-colors font-medium">
            Make a Reservation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10" style={{ backgroundColor: "#2A332D" }}>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-white/60">&copy; 2025 Woodvale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
