"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  GiCookingPot,
  GiGhost,
  GiMagicGate,
  GiMagnifyingGlass,
  GiScrollUnfurled,
  GiSherlockHolmes,
  GiSpaceship,
  GiThink,
  GiTreasureMap,
} from "react-icons/gi";
import {
  AiFillHeart,
} from "react-icons/ai";
import {
  FaFeatherAlt,
  FaFlask,
  FaFootballBall,
  FaGlobeAmericas,
  FaHistory,
  FaLaughBeam,
  FaMusic,
  FaPaintBrush,
  FaPrayingHands,
  FaRegSmileBeam,
  FaUser,
} from "react-icons/fa";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Mystery",
    icon: GiMagnifyingGlass,
    description: "This book is mysterious!",
  },
  {
    label: "Science Fiction",
    icon: GiSpaceship,
    description: "This book is sci-fi themed!",
  },
  {
    label: "Fantasy",
    icon: GiMagicGate,
    description: "This book has fantasy!",
  },
  {
    label: "Romance",
    icon: AiFillHeart,
    description: "This book is romantic!",
  },
  {
    label: "Biography",
    icon: FaUser,
    description: "This book is a biography!",
  },
  {
    label: "Self-help",
    icon: GiMagnifyingGlass,
    description: "This book is about self-help!",
  },
  {
    label: "Horror",
    icon: GiGhost,
    description: "This book has horror!",
  },
  {
    label: "History",
    icon: FaHistory,
    description: "This book is about history!",
  },
  {
    label: "Adventure",
    icon: GiTreasureMap,
    description: "This book has adventure!",
  },
  {
    label: "Poetry",
    icon: FaFeatherAlt,
    description: "This book has poetry in it!",
  },
  {
    label: "Historical fiction",
    icon: GiScrollUnfurled,
    description: "This book has historical events but is fictional!",
  },
  {
    label: "Comedy",
    icon: FaLaughBeam,
    description: "This book is funny!",
  },
  {
    label: "Philosophy",
    icon: GiThink,
    description: "This book is philosophical!",
  },
  {
    label: "Graphic Novel",
    icon: FaRegSmileBeam,
    description: "This book is a comic!",
  },
  {
    label: "Crime",
    icon: GiSherlockHolmes,
    description: "This book has crime and detective work!",
  },
  {
    label: "Science",
    icon: FaFlask,
    description: "This book is scientific!",
  },
  {
    label: "Cooking",
    icon: GiCookingPot,
    description: "This book is about cooking!",
  },
  {
    label: "Travel",
    icon: FaGlobeAmericas,
    description: "This book is about travel!",
  },
  {
    label: "Art",
    icon: FaPaintBrush,
    description: "This book is about art!",
  },
  {
    label: "Music",
    icon: FaMusic,
    description: "This book is about music!",
  },
  {
    label: "Religion",
    icon: FaPrayingHands,
    description: "This book is about religion!",
  },
  {
    label: "Sports",
    icon: FaFootballBall,
    description: "This book is about sports!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="border-b border-neutral-200 bg-white">
      <Container>
        <div
          className="
            flex
            h-[92px]
            items-center
            gap-2
            overflow-x-auto
            overflow-y-hidden
            scrollbar-thin
          "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;