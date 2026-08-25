import usedCookingOil from "../assets/images/used-cooking-oil.webp";
import kitchenUsedCookingOil from "../assets/images/kitchen-used-cooking-oil.png";
import usedCookingOilContainer from "../assets/images/used-cooking-oil-container.webp";
import soyOil from "../assets/images/soy-oil.jpg";
import sunflowerPressedOil from "../assets/images/sunflower-pressed-oil.png";
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
        description:
            "UCO, POME, and expired oils sourced from vetted collection networks.",
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
        description:
            "Sunflower, canola, and avocado oil sourced directly from producers.",
        image: soyOil,
        heroImage: sunflowerPressedOil,
        sections: [
            {
                heading: "What Are Vegetable Oils?",
                paragraphs: [
                    "Vegetable oils are plant-derived oils pressed or extracted from seeds and fruit — including sunflower, canola (rapeseed), and avocado — valued for their consistent quality and high oil content.",
                    "As a biodiesel feedstock, vegetable oils convert efficiently through transesterification and are traded both as virgin oils and as surplus or off-spec volumes from producers and processors.",
                ],
                listIntro: "The vegetable oils we trade include:",
                list: ["Sunflower oil", "Canola (rapeseed) oil", "Avocado oil"],
            },
            {
                heading: "How Our Process Works",
                steps: [
                    "Sourcing — We work directly with producers and processors to secure consistent volumes of sunflower, canola, and avocado oil.",
                    "Verification — Every batch is checked and documented for quality and traceability before it moves.",
                    "Trading & Delivery — We match supply to buyer demand and coordinate logistics through to final delivery.",
                ],
            },
        ],
    },
    {
        id: "products-animal-fats",
        slug: "animal-fats",
        title: "Animal Fats",
        description:
            "Tallow and other rendered animal fats sourced for biodiesel feedstock supply.",
        image: animalFat,
        sections: [
            {
                heading: "What Is Animal Fat?",
                paragraphs: [
                    "Animal fat — most commonly tallow — is the rendered fat by-product of meat processing, extracted from beef, pork, or poultry during slaughter and processing operations.",
                    "Once rendered and graded, animal fat is a stable, energy-dense feedstock for biodiesel production, offering an alternative pathway to virgin vegetable oils.",
                ],
                listIntro: "Common sources include:",
                list: [
                    "Beef tallow from cattle processing",
                    "Pork fat (lard) from pork processing",
                    "Poultry fat from poultry processing",
                    "Rendering plants and abattoirs",
                ],
            },
            {
                heading: "How Our Process Works",
                steps: [
                    "Sourcing — We work with rendering plants, abattoirs, and meat processors to source graded animal fats.",
                    "Verification — Every batch is checked and documented for quality and traceability before it moves.",
                    "Trading & Delivery — We match supply to buyer demand and coordinate logistics through to final delivery.",
                ],
            },
        ],
    },
];
