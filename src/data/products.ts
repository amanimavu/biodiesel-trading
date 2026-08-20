import usedCookingOil from "../assets/images/used-cooking-oil.webp";
import kitchenUsedCookingOil from "../assets/images/kitchen-used-cooking-oil.png";
import usedCookingOilContainer from "../assets/images/used-cooking-oil-container.webp";
import soyOil from "../assets/images/soy-oil.jpg";
import animalFat from "../assets/images/animal-fat.png";

export interface ProductSection {
  heading: string;
  paragraphs?: string[];
  listIntro?: string;
  list?: string[];
  steps?: string[];
  image?: ImageMetadata;
}

export interface ProductGroup {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: ImageMetadata;
  heroImage?: ImageMetadata;
  sections?: ProductSection[];
}

export const products: ProductGroup[] = [
  {
    id: "products-waste-oils",
    slug: "waste-oils",
    title: "Used & Recovered Oils",
    description: "UCO, POME, and expired oils sourced from vetted collection networks.",
    image: usedCookingOil,
    heroImage: kitchenUsedCookingOil,
    sections: [
      {
        heading: "What is Used Cooking Oil?",
        paragraphs: [
          "Used cooking oil (UCO) is vegetable or animal-based oil that has already served its purpose in frying or food preparation and can no longer be used in the kitchen.",
          "Rather than being discarded, UCO is collected, tested, and traded as a feedstock for biodiesel production — cutting waste while reducing reliance on virgin, fossil-based fuel inputs.",
        ],
        listIntro: "Some common sources include:",
        list: [
          "Restaurants and quick-service food outlets",
          "Hotels and catering operations",
          "Commercial and institutional kitchens",
          "Food processing and manufacturing plants",
        ],
        image: usedCookingOilContainer,
      },
      {
        heading: "How Our Process Works",
        steps: [
          "Sourcing — We work with a vetted network of collectors and producers who supply UCO, POME, and expired oils.",
          "Verification — Every batch is checked and documented for quality and traceability before it moves.",
          "Trading & Delivery — We match supply to buyer demand and coordinate logistics through to final delivery.",
        ],
      },
    ],
  },
  {
    id: "products-vegetable-oils",
    slug: "vegetable-oils",
    title: "Vegetable Oils",
    description: "Sunflower, canola, and avocado oil sourced directly from producers.",
    image: soyOil,
  },
  {
    id: "products-animal-fats",
    slug: "animal-fats",
    title: "Animal Fats",
    description: "Tallow and other rendered animal fats sourced for biodiesel feedstock supply.",
    image: animalFat,
  },
];
