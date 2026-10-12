import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CtaBand, FaqList, PageHero } from "../components/ui";

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered straight."
        intro={
          <>
            The things business owners ask before they sign up. Can't find yours?{" "}
            <Link to="/contact" className="text-accent underline underline-offset-4">
              Get in touch
            </Link>
            .
          </>
        }
      />
      <section className="pb-20">
        <div className="container-cs max-w-3xl">
          <Reveal>
            <FaqList />
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
