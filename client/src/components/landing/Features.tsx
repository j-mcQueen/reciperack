import { ReactElement } from "react";
import AddIcon from "../../assets/icons/Add";
import BuildIcon from "../../assets/icons/Build";
import SearchIcon from "../../assets/icons/Search";
import Highlight from "./Highlight";

export default function Features() {
  interface Features {
    highlight: { titles: string[]; copy: string[] };
    card: {
      titles: string[];
      images: { icon: ReactElement; alt: string }[];
      copy: string[];
    };
  }

  const featureProps: Features = {
    highlight: {
      titles: [
        "Build your own recipe hub",
        "Organize your food week",
        "Discover new cuisines",
      ],
      copy: [
        "Now you no longer have to scour the internet for all your favourite recipes. All you need is an account and links to your favourite websites. Then you need only look in one place.",
        "Remove the mental overhead of meal planning - armed with reciperack's simple menu tool and your collection of recipes, you can create your own personal menu for the week.",
        "Have a secret recipe that you just can't wait to share? Add it to the public collection and give your recipe the recognition it deserves.",
      ],
    },
    card: {
      titles: ["Create", "Curate", "Explore"],
      images: [
        {
          icon: <AddIcon className="w-6 h-6 fill-txt2" />,
          alt: "A plus icon",
        },
        {
          icon: <BuildIcon className="w-6 h-6 fill-txt2" />,
          alt: "A crossing hammer and chisel icon",
        },
        {
          icon: <SearchIcon className="w-6 h-6 fill-txt2" />,
          alt: "A magnifying glass icon",
        },
      ],
      copy: [
        "Add your favourite online or personal recipes",
        "Build your personal food menu and make meal choice simple",
        "Share your best recipes or browse other users' favourites",
      ],
    },
  };

  return (
    <>
      <section className="font-manrope flex flex-col justify-center items-center gap-10 pb-10">
        <h2 className="tracking-tighter text-gold text-center text-3xl border-solid border-b-2 pb-5">
          FEATURES
        </h2>

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
      </section>

      <section className="flex flex-col justify-center items-center gap-10 pb-10">
        <h2 className="font-manrope tracking-tighter text-gold text-center text-3xl border-solid border-b-2 pb-5">
          COMING SOON
        </h2>

        <Highlight
          highlightTitle={featureProps.highlight.titles[2]}
          highlightText={featureProps.highlight.copy[2]}
          cardTitle={featureProps.card.titles[2]}
          cardImg={featureProps.card.images[2].icon}
          cardImgAlt={featureProps.card.images[2].alt}
          cardText={featureProps.card.copy[2]}
        />
      </section>
    </>
  );
}
