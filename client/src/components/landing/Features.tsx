import icons from "../../assets/icons/export";
import Highlight from "./Highlight";

export default function Features() {
  interface Features {
    highlight: { titles: string[]; copy: string[] };
    card: {
      titles: string[];
      images: { icon: string; alt: string }[];
      copy: string[];
    };
  }

  const featureProps: Features = {
    highlight: {
      titles: [
        "Build your own recipe hub.",
        "Discover new cuisines.",
        "Lorem ipsum.",
      ],
      copy: [
        "Now you no longer have to scour the internet for all your favourite recipes. All you need is an account and links to your favourite websites, then you only need look in one place.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ],
    },
    card: {
      titles: ["Create", "Explore", "Curate"],
      images: [
        { icon: icons.add, alt: "A plus icon" },
        { icon: icons.search, alt: "A magnifying glass icon" },
        { icon: icons.build, alt: "A crossing hammer and chisel icon" },
      ],
      copy: [
        "Create, upload and share your favourite recipes",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
    },
  };

  return (
    <section className="grid justify-center items-center gap-[50px]">
      <Highlight
        highlightTitle={featureProps.highlight.titles[0]}
        highlightText={featureProps.highlight.copy[0]}
        cardTitle={featureProps.card.titles[0]}
        cardImg={featureProps.card.images[0].icon}
        cardImgAlt={featureProps.card.images[0].alt}
        cardText={featureProps.card.copy[0]}
      />
      <Highlight
        highlightTitle={featureProps.highlight.titles[1]}
        highlightText={featureProps.highlight.copy[1]}
        cardTitle={featureProps.card.titles[1]}
        cardImg={featureProps.card.images[1].icon}
        cardImgAlt={featureProps.card.images[1].alt}
        cardText={featureProps.card.copy[1]}
      />
      <Highlight
        highlightTitle={featureProps.highlight.titles[2]}
        highlightText={featureProps.highlight.copy[2]}
        cardTitle={featureProps.card.titles[2]}
        cardImg={featureProps.card.images[2].icon}
        cardImgAlt={featureProps.card.images[2].alt}
        cardText={featureProps.card.copy[2]}
      />
    </section>
  );
}
