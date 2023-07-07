import icons from "../../assets/icons/export";
import Highlight from "./Highlight";

export default function Features() {
  interface HighlightProps {
    highlightTitles: string[];
    highlightText: string[];
    cardTitle: string[];
    cardImg: string[];
    cardText: string[];
  }

  const highlightProps: HighlightProps = {
    highlightTitles: [
      "Build your own recipe hub.",
      "Discover new cuisines.",
      "Lorem ipsum.",
    ],
    highlightText: [
      "Now you no longer have to scour the internet for all your favourite recipes. All you need is an account and links to your favourite websites, then you only need look in one place.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    ],
    cardTitle: ["Create", "Explore", "Curate"],
    cardImg: [icons.add, icons.build, icons.search],
    cardText: [
      "Create, upload and share your favourite recipes",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  };

  return (
    <section className="grid justify-center items-center gap-[50px]">
      <Highlight
        highlightTitle={highlightProps.highlightTitles[0]}
        highlightText={highlightProps.highlightText[0]}
        cardTitle={highlightProps.cardTitle[0]}
        cardImg={highlightProps.cardImg[1]}
        cardText={highlightProps.cardText[0]}
      />
      <Highlight
        highlightTitle={highlightProps.highlightTitles[1]}
        highlightText={highlightProps.highlightText[1]}
        cardTitle={highlightProps.cardTitle[1]}
        cardImg={highlightProps.cardImg[1]}
        cardText={highlightProps.cardText[1]}
      />
      <Highlight
        highlightTitle={highlightProps.highlightTitles[2]}
        highlightText={highlightProps.highlightText[2]}
        cardTitle={highlightProps.cardTitle[2]}
        cardImg={highlightProps.cardImg[2]}
        cardText={highlightProps.cardText[2]}
      />
    </section>
  );
}
