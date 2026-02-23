import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from '@blitz-ui/react/accordion';

export default function AccordionVariantDefault() {
  return (
    <Accordion multiple={false} className="w-full lg:w-[75%]">
      <AccordionItem value="coui-1">
        <AccordionTrigger>What is Blitz UI?</AccordionTrigger>
        <AccordionContent>
          Blitz UI is a flexible UI library that you can either install as a dependency or copy as
          shadcn-style components for full customization.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="coui-2">
        <AccordionTrigger>Who benefits from Blitz UI?</AccordionTrigger>
        <AccordionContent>
          Developers who want the freedom to choose between a drop-in package and self-hosted, fully
          editable components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="coui-3">
        <AccordionTrigger>Why choose Blitz UI?</AccordionTrigger>
        <AccordionContent>
          Blitz UI provides a best-of-both-worlds approach—easy dependency-based usage or
          shadcn-inspired components for total control and customization.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
