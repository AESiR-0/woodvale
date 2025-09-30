import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const restaurant = {
    name: "WOODVALE",
    location: "location",
    image: "/woodvalePic.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eius molestias? Blanditiis cum temporibus et? Accusamus sunt veritatis eligendi, animi numquam quam nostrum cumque aliquid iure exercitationem id nisi praesentium officiis a aspernatur consequuntur expedita ea placeat assumenda! Laborum harum et ullam minus itaque. Ex fuga, similique id itaque asperiores deserunt alias impedit quae qui in delectus, sit harum rem beatae temporibus. Porro odio, aperiam nulla, officiis sapiente vel amet aliquam accusantium vitae commodi tempora. Voluptatibus neque eos minima assumenda ut, accusamus earum quaerat dignissimos in aut quo quae quasi.",
    mission:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, nihil? Corporis autem rem maiores vel modi tenetur accusamus laudantium eveniet repellendus suscipit dolor, sint consectetur. Fuga corporis inventore rem neque quidem quisquam dignissimos minus dicta, impedit ullam facere unde nemo?",
  };

  return (
    <div className="min-h-screen bg-beige">
      <Navbar
        scrolledBgColor="bg-white"
        textColor="text-gray-600"
        scrolledTextColor="text-gray-900"
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative h-64 mb-8">
          <div className="absolute bottom-4 bg-[var(--leaf)] bg-opacity-75 p-4 rounded">
            <h2 className="text-3xl font-bold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.location}</p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {restaurant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
            <p className="text-gray-600">{restaurant.mission}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              eveniet, deserunt dolorum tempore ducimus nihil asperiores
              explicabo itaque nesciunt sequi ipsa molestias rem reprehenderit
              dolores harum? In voluptatibus eum ratione odio, unde recusandae
              praesentium excepturi tempora. Eius quisquam porro, dolorem
              tempora eligendi magni asperiores veritatis perferendis ipsam,
              sequi excepturi esse.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
          &copy; 2025 District. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
