"use client";

import React from "react";
import { categories } from "@/utils/dishesData";

interface Dish {
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
  longDescription?: string;
  price?: number;
}

const TraditionalMenu = () => {
  
  return (
    <div className="min-h-screen bg-[#E6E8D9]">
      <div className="container mx-auto px-6 pt-32 pb-20 bg-[#E6E8D9]">
        {/* Appetizers Section */}
        <section className="mt-20">
          <div className="border-t border-gray-300 mb-8"></div>
          <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
            Appetizers
          </h2>
          <div className="space-y-6">
            {[
              {
                id: 1,
                name: "Soup of the Day",
                priceDisplay: "$10",
                description: "Ask your server for today’s selection.",
              },
              {
                id: 2,
                name: "Caesar Salad",
                priceDisplay: "$9 / $14",
                description:
                  "Romaine hearts / house dressing / shaved parmesan / capers / grilled lemon / garlic herb croutons.",
              },
              {
                id: 3,
                name: "Mussels",
                priceDisplay: "$24",
                description:
                  "Atlantic mussels / fire roasted tomato and smoked paprika sauce / crostini / garlic and juniper oil.",
              },
              {
                id: 4,
                name: "Cauliflower",
                priceDisplay: "$17",
                description:
                  "Tempura fried / porcini powdered / tajin / romesco / garlic aioli.",
              },
              {
                id: 5,
                name: "Croquettes",
                priceDisplay: "$19",
                description:
                  "Sweet potato blend / bocconcini / carrot / brown sugar / lavender infused wildberry compote.",
              },
              {
                id: 5,

                name: "Elk Carpaccio",
                priceDisplay: "$21",
                description:
                  "Sliced elk / smoked miso aioli drizzle / pickled blueberries & onions / shaved parmesan / crostini.",
              },
              {
                id: 5,

                name: "Bison Sliders",
                priceDisplay: "$19",
                description:
                  "Grilled bison patties / smoked gouda / caramelized onions / lavender infused wildberry compote.",
              },
              {
                id: 5,

                name: "Butter Board",
                priceDisplay: "$25",
                description:
                  "Honey and lavender infused butter / toasted pumpkin seeds / pine nuts / caramelized onion jam / flowers / crostini.",
              },
              {
                id: 5,

                name: "Bruschetta",
                priceDisplay: "$16",
                description:
                  "Foraged mushroom medley / confit baby tomatoes / fromage blanc / balsamic glaze.",
              },
            ].map((dish) => (
              <div key={dish.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans text-lg font-semibold text-[#071d18]">
                      {dish.name}
                    </h3>
                    {dish.priceDisplay || (
                      <span className="text-lg font-semibold text-[#071d18] ml-4">
                        ${dish.priceDisplay}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#071d18]/70 ml-4 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Build Your Own Charcuterie */}
            <section className="mb-20">
              <div className="border-t border-gray-300 mb-8"></div>
              <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
                Build Your Own Charcuterie
              </h2>
              <div className="grid grid-cols-4 gap-8">
                {/* Meat */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-[#071d18] mb-4">
                    Meat
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Red wine prosciutto
                      </span>
                      <span className="text-[#071d18]/70">$8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Smoked turkey</span>
                      <span className="text-[#071d18]/70">$9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Pistachio-apricot & cherry pâté
                      </span>
                      <span className="text-[#071d18]/70">$10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Cranberry walnut salami
                      </span>
                      <span className="text-[#071d18]/70">$10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Elk green peppercorn salami
                      </span>
                      <span className="text-[#071d18]/70">$12</span>
                    </div>
                  </div>
                </div>

                {/* Cheese */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-[#071d18] mb-4">
                    Cheese
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Brie</span>
                      <span className="text-[#071d18]/70">$8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Clothbound cheddar
                      </span>
                      <span className="text-[#071d18]/70">$9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Smoked gouda</span>
                      <span className="text-[#071d18]/70">$8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">
                        Morel butter cheese
                      </span>
                      <span className="text-[#071d18]/70">$11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Chaga</span>
                      <span className="text-[#071d18]/70">$9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Alpine cheddar</span>
                      <span className="text-[#071d18]/70">$10</span>
                    </div>
                  </div>
                </div>

                {/* Pickled */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-[#071d18] mb-4">
                    Pickled
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Asparagus</span>
                      <span className="text-[#071d18]/70">$4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Carrots</span>
                      <span className="text-[#071d18]/70">$4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Beets</span>
                      <span className="text-[#071d18]/70">$5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Blueberries</span>
                      <span className="text-[#071d18]/70">$6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Chili olives</span>
                      <span className="text-[#071d18]/70">$4</span>
                    </div>
                  </div>
                </div>

                {/* Spreads */}
                <div>
                  <h3 className="font-sans text-lg font-bold text-[#071d18] mb-4">
                    Spreads
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Rosehip & maple</span>
                      <span className="text-[#071d18]/70">$4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Saskatoon berry</span>
                      <span className="text-[#071d18]/70">$5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#071d18]/70">Smoked vanilla</span>
                      <span className="text-[#071d18]/70">$5</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Entrées Section (Updated from PDF) */}
        <section className="mb-20">
          <div className="border-t border-gray-300 mb-8"></div>
          <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
            Entrées
          </h2>

          <div className="space-y-6">
            {[
              {
                name: "Chicken",
                price: 39,
                description:
                  "Roasted chicken breast / creamy chestnut and foraged mushroom risotto / thyme jus / pomme gastrique",
              },
              {
                name: "Striploin",
                price: 53,
                description:
                  "10 oz New York striploin / wild mushroom and truffle mashed potato / glazed seasonal vegetables / thyme and black garlic jus",
              },
              {
                name: "Salmon",
                price: 41,
                description:
                  "Grilled B.C. salmon / fingerling potatoes / spruced gremolata / pine and lemon butter baste",
              },
              {
                name: "Tagliatelle",
                price: 37,
                description:
                  "Slow braised short rib / tagliatelle pasta / roasted mushrooms / confit baby tomatoes / dill cream sauce",
              },
              {
                name: "Pescatore",
                price: 37,
                description:
                  "Linguine / mussels / jumbo shrimp / baby scallops / capers / lemon cream sauce or spicy tomato sauce",
              },
              {
                name: "Bison Lasagna",
                price: 39,
                description:
                  "Seasoned ground bison / spinach / cottage cheese / mozzarella / housemade tomato sauce",
              },
              {
                name: "Campfire Molcajete",
                price: 99,
                description:
                  "Beef striploin / lobster tail / chicken / mussels / shrimp / scallops / roasted tomatillo broth / smoked herb / ignited liqueur / serves two guests in stone molcajete bowl",
              },
              {
                name: "Risotto",
                price: 29,
                description:
                  "Foraged wild mushrooms / cauliflower / baby zucchini / juniper emulsion",
              },
              {
                name: "Short Rib",
                price: 45,
                description:
                  "Slow braised short rib / wild mushroom and truffle mashed potato / glazed seasonal vegetables / root brew jus",
              },
            ].map((dish, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans text-lg font-semibold text-[#071d18]">
                      {dish.name}
                    </h3>
                    <span className="text-lg font-semibold text-[#071d18] ml-4">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-sm text-[#071d18]/70 ml-4 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Section (synced with PDF) */}
        <section className="mb-20">
          <div className="border-t border-gray-300 mb-8"></div>
          <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
            Additional
          </h2>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4 text-[#071d18]/70">
              <div className="flex justify-between">
                <span>add chicken</span>
                <span>- $10</span>
              </div>
              <div className="flex justify-between">
                <span>add salmon</span>
                <span>- $13</span>
              </div>
            </div>
            <div className="space-y-4 text-[#071d18]/70">
              <div className="flex justify-between">
                <span>add lobster tail</span>
                <span>- $24</span>
              </div>
              <div className="flex justify-between">
                <span>add shrimps (3)</span>
                <span>- $9</span>
              </div>
            </div>
            <div className="space-y-4 text-[#071d18]/70">
              <div className="flex justify-between">
                <span>gluten free pasta</span>
                <span>- $5</span>
              </div>
              <div className="flex justify-between">
                <span>gluten free bread</span>
                <span>- $4</span>
              </div>
              <div className="flex justify-between">
                <span>add crostini</span>
                <span>- $3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brunch Section */}
{/* Brunch Section */}
<section className="mb-20">
  <div className="border-t border-gray-300 mb-8"></div>
  <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-2 text-center">
    Brunch
  </h2>
  <p className="text-center text-[#071d18]/70 mb-12">
    served from 9:30 a.m – 3:00 p.m
  </p>

  <div className="space-y-6">
    {[
      {
        name: "Brunch Board",
        description:
          "short rib, bacon, sausage, belgian waffles, scrambled eggs, hashed potatoes, assorted fruit, wildberry compote, toast, whipped cream, nutella, syrup",
        price: 56,
      },
      {
        name: "Traditional Benny",
        description: "smoked ham, poached eggs, hollandaise, hashed potatoes",
        price: 18,
      },
      {
        name: "Salmon Benny",
        description: "smoked salmon, poached eggs, spinach, hollandaise, potatoes",
        price: 24,
      },
      {
        name: "French Toast",
        description: "cinnamon loaf, wildberry compote, lemon mascarpone, maple syrup, fruit",
        price: 17,
      },
      {
        name: "Breakfast Burrito",
        description: "ham or bacon, wild mushrooms, tomatoes, scrambled egg, spinach, smashed potatoes",
        price: 17,
      },
      {
        name: "Chicken & Waffles",
        description: "maple glazed crispy chicken, belgian waffles, pickled onions, arugula, salted caramel",
        price: 22,
      },
      {
        name: "Woodvale Classic",
        description: "choice of bacon or sausage, eggs, hashed potatoes, sourdough toast",
        price: 16,
      },
      {
        name: "Breakfast Hash",
        description: "braised short rib, hashed potatoes, poached eggs, pickled onion, hollandaise, crispy tortilla strips",
        price: 18,
      },
    ].map((dish, i) => (
      <div key={i} className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-sans text-lg font-semibold text-[#071d18]">
              {dish.name}
            </h3>
            <span className="text-lg font-semibold text-[#071d18] ml-4">
              ${dish.price}
            </span>
          </div>
          <p className="text-sm text-[#071d18]/70 ml-4 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Add-ons Section */}
  <div className="border-t border-gray-300 mt-16 mb-8"></div>
  <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6 text-center">
    Add-ons
  </h3>

  <div className="grid md:grid-cols-3 gap-8 text-[#071d18]/80">
    <div className="space-y-2">
      <p>add bacon - 3</p>
      <p>add smoked salmon - 7</p>
      <p>add guacamole - 4</p>
    </div>
    <div className="space-y-2">
      <p>add traditional benny - 6</p>
      <p>add salmon benny - 9</p>
      <p>add egg - 2</p>
    </div>
    <div className="space-y-2">
      <p>add potato - 4</p>
      <p>add fruit - 5</p>
      <p>add toast - 2</p>
    </div>
  </div>
</section>

        {/* Drinks Section */}
        <section className="mb-20">
          <div className="border-t border-gray-300 mb-8"></div>
          <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
            Drinks
          </h2>

          {/* Cocktails */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              Cocktails
            </h3>
            <div className="space-y-6 text-[#071d18]/80">
              {[
                {
                  name: "Forest Ember Old Fashioned",
                  price: 16,
                  description:
                    "Bourbon / spruce tip syrup / Angostura bitters / lapsang tea / smoked.",
                },
                {
                  name: "Enchanted Bloom",
                  price: 16,
                  description:
                    "Empress gin / violet liqueur / triple sec / lemon juice / egg white / garnish.",
                },
                {
                  name: "Molech’s Mule",
                  price: 16,
                  description:
                    "Cucumber vodka / lime juice / ginger beer / lime.",
                },
                {
                  name: "Golden Smoke",
                  price: 17,
                  description:
                    "Bourbon / honey & rosemary syrup / orange juice / egg white / smoked salt.",
                },
                {
                  name: "Wild Grove",
                  price: 17,
                  description:
                    "Fruity gin / blackcurrant & basil syrup / tonic / garnish.",
                },
                {
                  name: "Whispering Spruce",
                  price: 17,
                  description:
                    "Dry gin / red vermouth / maraschino liqueur / Angostura & chocolate bitters / birch syrup.",
                },
                {
                  name: "Orchard Stroll",
                  price: 17,
                  description:
                    "Spiced rum / Amaro Nonino / apricot liqueur / egg white / apple / fall spices.",
                },
                {
                  name: "Echo of the Forest",
                  price: 17,
                  description:
                    "Dry gin / Drambuie / Amaro Lucano / pine bitter.",
                },
                {
                  name: "Green Goblin",
                  price: 16,
                  description: "Tequila / triple sec / lime juice / garnish.",
                },
                {
                  name: "Dash of Dasha",
                  price: 16,
                  description:
                    "Espresso vodka / coffee / Kahlua / pinch of ground cinnamon / ignited.",
                },
              ].map((cocktail, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-[#071d18]">
                      {cocktail.name}
                    </h4>
                    <p className="text-sm text-[#071d18]/70">
                      {cocktail.description}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-[#071d18]">
                    ${cocktail.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Draught Section */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              Draught
            </h3>
            <div className="space-y-3 text-[#071d18]/80">
              {[
                { name: "House Lager", price: 9.75 },
                { name: "SeaChange “The Wolf” Hazy Pale Ale", price: 10 },
                { name: "SeaChange Irish Red", price: 10 },
                { name: "Odd Company Mandarin Sour", price: 10 },
              ].map((beer, i) => (
                <div key={i} className="flex justify-between">
                  <span>{beer.name}</span>
                  <span>{beer.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottles & Cans */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              Bottles & Cans
            </h3>
            <div className="space-y-3 text-[#071d18]/80">
              {[
                { name: "88 Brewing Vietnamese Coffee Stout", price: 11 },
                { name: "Sapporo", price: 10 },
                { name: "Troubled Monk Open Road Brown Ale", price: 10 },
                { name: "Odd Company Good Chemistry IPA", price: 10 },
                { name: "Alley Kat Pumpkin Pie Spiced Ale", price: 13 },
                { name: "SeaChange Death Wave Light Lager", price: 11 },
                { name: "Rock Creek Dry Apple Cider", price: 11 },
                { name: "Big Rock Non-Alcoholic Golden Ale", price: 11 },
                { name: "Ole Tequila Soda", price: 9.5 },
                { name: "Dillon’s Gin Cocktail", price: 6 },
              ].map((bottle, index) => (
                <div key={index} className="flex justify-between">
                  <span>{bottle.name}</span>
                  <span>${bottle.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gin & Tonics */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6 text-center">
              Gin & Tonics
              <div className="flex justify-center text-[#071d18]/80 text-base font-2xl mb-8">
                <span>1 oz. / 9 &nbsp;&nbsp;•&nbsp;&nbsp; 2 oz. / 17</span>
              </div>
            </h3>

            {/* Gin List */}
{/* Gin List */}
<div className="grid md:grid-cols-2 gap-6 text-center text-[#071d18]/80 mb-8">
  {[
    { name: "Park Alpine Dry Gin", region: "Canada", notes: "juniper, citrus, spruce pine, herbs" },
    { name: "Bulldog", region: "UK", notes: "floral, exotic fruit, citrus, juniper" },
    { name: "Dillon’s", region: "Canada", notes: "juniper, unfiltered, complex" },
    { name: "Gin Mare", region: "Spain", notes: "juniper, olives, rosemary, thyme" },
    { name: "Empress", region: "Canada", notes: "bold juniper, citrus, floral" },
    { name: "Drumshanbo Gunpowder", region: "Ireland", notes: "green tea, asian botanicals" },
    { name: "Brockman’s", region: "UK", notes: "coriander, blackberry, valencia orange" },
    { name: "Strathcona Spirits Badland", region: "Canada", notes: "juniper, seaberry, dry" },
    { name: "Hayman’s Sloe Gin", region: "UK", notes: "almond, frangipane, and berries" },
    { name: "Hendrick’s", region: "Scotland", notes: "cucumber, rose, honeyed citrus, juniper" },
    { name: "Collective Arts", region: "Canada", notes: "juniper, rosemary, basil, cardamom" },
    { name: "The Botanist", region: "Scotland", notes: "orris root, cassia bark, coriander, and juniper" },
    { name: "Aviation", region: "USA", notes: "juniper, lavender, sarsaparilla" },
    { name: "Citadelle", region: "France", notes: "liquorice, coriander, lemon, almond, juniper, oak" },
    { name: "Boodles", region: "UK", notes: "cassia, caraway, rosemary, sage, juniper" },
    { name: "Noteworthy", region: "Canada", notes: "orange, botanicals, tang crystals" },
    { name: "Lind & Lime", region: "Scotland", notes: "juniper, lime" },
    { name: "Blossom Peach", region: "Spain", notes: "peach, juniper, citrus" },
    { name: "Romeo’s X", region: "Canada", notes: "watermelon, lavender, cucumber" },
    { name: "Sorgin", region: "France", notes: "sauvignon blanc grapes, juniper, violet, broom flower, grapefruit" },
    { name: "Tanqueray 10", region: "UK", notes: "juniper, citrus peel, grapefruit, chamomile" },
    { name: "Caorunn", region: "UK", notes: "lavender, marijuana, pepper" },
    { name: "Dingle", region: "Canada", notes: "berry, fuchsia, bog myrtle" },
    { name: "Roku", region: "Japan", notes: "sakura, yuzu, green tea" },
    { name: "Bathtub", region: "UK", notes: "grapefruit, rosemary, herbal" },
    { name: "Malfy Arancia", region: "Italy", notes: "blood orange peel, juniper, coriander, citrus zest" },
  ].map((gin, i) => (
    <div key={i} className="mb-4">
      <h4 className="font-sans text-base font-semibold text-[#071d18] capitalize">
        {gin.name}{" "}
        <span className="text-[#071d18]/70 lowercase">
          ({gin.region})
        </span>
      </h4>
      <p className="text-sm text-[#071d18]/70 ml-4 leading-relaxed">
        {gin.notes}
      </p>
    </div>
  ))}
</div>


            {/* Pricing Note */}
            <div className="border-t border-gray-300 my-6"></div>

            {/* Tonics and Ice Section */}
            <div className="grid md:grid-cols-2 gap-12 text-center text-[#071d18]/80">
              <div>
                <h4 className="text-xl font-semibold text-[var(--mint)] mb-3">
                  Tonics
                </h4>
                <ul className="space-y-2 text-sm text-[#071d18]/80">
                  <li>
                    Green Remedy – cucumber, rosemary, basil, lime, black pepper
                  </li>
                  <li>
                    Velvet Bloom – lavender, hibiscus, orange, lemongrass, clove
                  </li>
                  <li>Sunburst – grapefruit, orange, lemon, ginger, juniper</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[var(--mint)] mb-3">
                  Ice
                </h4>
                <ul className="space-y-2 text-sm text-[#071d18]/80">
                  <li>Standard Cubes</li>
                  <li>Large Cubes</li>
                  <li>Shaved Ice</li>
                  <li>Smoked Ice</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Wines Section */}
        <section className="mb-20">
          <div className="border-t border-gray-300 mb-8"></div>
          <h2 className="font-sans text-3xl font-bold text-[var(--mint)] mb-8 text-center">
            Wines
          </h2>

          {/* Rosé & Bubbles */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              Rosé & Bubbles
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-2 text-sm text-[#071d18]/70">
              <div></div>
              <div className="text-center">6oz</div>
              <div className="text-center">9oz</div>
              <div className="text-center">Bottle</div>
            </div>
            {[
              {
                name: "Ken Forrester ‘Petit’ Rosé",
                region: "South Africa",
                price6: 12,
                price9: 16,
                bottle: 48,
              },
              {
                name: "Gerard Bertrand ‘Cote de Roses’ Rosé",
                region: "France",
                price6: "-",
                price9: "-",
                bottle: 65,
              },
              {
                name: "Lamarcca Prosecco",
                region: "Italy",
                price6: 12,
                price9: "-",
                bottle: 48,
              },
              {
                name: "Frind Sparkling Brut",
                region: "Canada",
                price6: "-",
                price9: "-",
                bottle: 72,
              },
              {
                name: "Domaine Carneros Sparkling Brut",
                region: "California",
                price6: "-",
                price9: "-",
                bottle: 105,
              },
            ].map((wine, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 items-center font-medium text-[#071d18]/80"
              >
                <div>
                  <h4 className="font-light">{wine.name}</h4>
                  <p className="text-sm">{wine.region}</p>
                </div>
                <div className="text-center">
                  {wine.price6 !== "-" ? `$${wine.price6}` : "-"}
                </div>
                <div className="text-center">
                  {wine.price9 !== "-" ? `$${wine.price9}` : "-"}
                </div>
                <div className="text-center">
                  {wine.bottle ? `$${wine.bottle}` : "-"}
                </div>
              </div>
            ))}
          </div>

          {/* White Wines */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              White
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-2 text-sm text-[#071d18]/70">
              <div></div>
              <div className="text-center">6oz</div>
              <div className="text-center">9oz</div>
              <div className="text-center">Bottle</div>
            </div>
            {[
  { name: "Perlage Pinot Grigio", region: "Italy", price6: 13, price9: 18, bottle: 52 },
  { name: "Ken Forrester Sauvignon Blanc", region: "South Africa", price6: 12, price9: 16, bottle: 48 },
  { name: "Bread & Butter Chardonnay", region: "California", price6: 13, price9: 18, bottle: 52 },
  { name: "Pillitteri Gewurztraminer / Riesling", region: "Canada", price6: 13, price9: 18, bottle: 52 },
  { name: "Pierre Sparr Gewurztraminer", region: "France", price6: "-", price9: "-", bottle: 63 },
  { name: "Honey Bee Chenin Blanc", region: "South Africa", price6: "-", price9: "-", bottle: 39 },
  { name: "Mission Hill Reserve Sauvignon Blanc", region: "Canada", price6: "-", price9: "-", bottle: 69 },
  { name: "Henry of Pelham Pinot Grigio", region: "Canada", price6: "-", price9: "-", bottle: 52 },
  { name: "Tantalus Old Vines Riesling", region: "Canada", price6: "-", price9: "-", bottle: 147 },
  { name: "Guillaume Vrignaud Chablis", region: "France", price6: "-", price9: "-", bottle: 99 },
  { name: "Joseph Drouhin Côte de Beaune Chardonnay", region: "France", price6: "-", price9: "-", bottle: 240 },

            ].map((wine, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 items-center font-medium text-[#071d18]/80"
              >
                <div>
<h4 className="font-lore font-light text-3xl">
  {wine?.name
    ?.split(/([&/])/)
    .map((part, i) =>
      part === "&" || part === "/" ? (
        <span key={i} className="font-sans font-sm"> {part} </span>
      ) : (
        <React.Fragment key={i}>{part.trim()}</React.Fragment>
      )
    )}
</h4>
                  <p className="text-sm">{wine.region}</p>
                </div>
                <div className="text-center">
                  {wine.price6 !== "-" ? `$${wine.price6}` : "-"}
                </div>
                <div className="text-center">
                  {wine.price9 !== "-" ? `$${wine.price9}` : "-"}
                </div>
                <div className="text-center">
                  {wine.bottle ? `$${wine.bottle}` : "-"}
                </div>
              </div>
            ))}
          </div>

          {/* Red Wines */}
          <div className="mb-16">
            <h3 className="font-sans text-2xl font-bold text-[var(--mint)] mb-6">
              Red
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-2 text-sm text-[#071d18]/70">
              <div></div>
              <div className="text-center">6oz</div>
              <div className="text-center">9oz</div>
              <div className="text-center">Bottle</div>
            </div>
            {[
  { name: "Angove Cabernet Sauvignon", region: "Australia", price6: 13, price9: 18, bottle: 52 },
  { name: "Killka Malbec", region: "Argentina", price6: 14, price9: 19, bottle: 54 },
  { name: "Bread & Butter Pinot Noir", region: "California", price6: 14, price9: 19, bottle: 54 },
  { name: "Porta 6 Red Blend", region: "Portugal", price6: 13, price9: 18, bottle: 52 },
  { name: "Guardian Peak Merlot", region: "Canada", price6: "-", price9: "-", bottle: 59 },
  { name: 'Frind "The Premier" Bordeaux Blend', region: "Canada", price6: "-", price9: "-", bottle: 89 },
  { name: "Botter Gran Passione Baby Amarone", region: "Italy", price6: "-", price9: "-", bottle: 57 },
  { name: "Hugo Shiraz", region: "Australia", price6: "-", price9: "-", bottle: 49 },
  { name: "Louis Jadot Beaujolais-Villages", region: "France", price6: "-", price9: "-", bottle: 49 },
  { name: "Il Bruciato Super Tuscan", region: "Italy", price6: "-", price9: "-", bottle: 89 },
  { name: "Enguera Sueno de Megala", region: "Italy", price6: "-", price9: "-", bottle: 75 },
  { name: "Tantalus Vineyards Pinot Noir", region: "Canada", price6: "-", price9: "-", bottle: 119 },
  { name: "Volpaia Chianti Classico", region: "Italy", price6: "-", price9: "-", bottle: 77 },
  { name: "Buehler Zinfandel", region: "Italy", price6: "-", price9: "-", bottle: 75 },
  { name: "Roberto Voerzio Barbera d'Alba", region: "Italy", price6: "-", price9: "-", bottle: 97 },
  { name: "Halos de Jupiter Grenache", region: "France", price6: "-", price9: "-", bottle: 52 },
  { name: 'Daou "The Pessimist" Red Blend', region: "California", price6: "-", price9: "-", bottle: 87 },
  { name: "Henschke Henry’s Seven Red Blend", region: "Australia", price6: "-", price9: "-", bottle: 129 },
  { name: "La Ragose Della Valpolicella Amarone", region: "Italy", price6: "-", price9: "-", bottle: 199 },
  { name: "Justin Cabernet Sauvignon", region: "California", price6: "-", price9: "-", bottle: 109 },
  { name: "Sequoia Grove Cabernet Sauvignon", region: "California", price6: "-", price9: "-", bottle: 189 },
  { name: "Catena Zapata Argentino Malbec", region: "Argentina", price6: "-", price9: "-", bottle: 275 },

            ].map((wine, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 items-center font-medium text-[#071d18]/80"
              >
                <div>
<h4 className="font-lore font-light text-3xl">
  {wine?.name
    ?.split(/([&/])/)
    .map((part, i) =>
      part === "&" || part === "/" ? (
        <span key={i} className="font-sans"> {part} </span>
      ) : (
        <React.Fragment key={i}>{part.trim()}</React.Fragment>
      )
    )}
</h4>
                  <p className="text-sm">{wine.region}</p>
                </div>
                <div className="text-center">
                  {wine.price6 !== "-" ? `$${wine.price6}` : "-"}
                </div>
                <div className="text-center">
                  {wine.price9 !== "-" ? `$${wine.price9}` : "-"}
                </div>
                <div className="text-center">
                  {wine.bottle ? `$${wine.bottle}` : "-"}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TraditionalMenu;
