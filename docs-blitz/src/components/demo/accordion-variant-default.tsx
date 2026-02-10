import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from '@blitz-ui/react/accordion';

export default function AccordionVariantDefault() {
  return (
    <AccordionRoot multiple={false} className="w-full lg:w-[75%]">
      <AccordionItem value="coui-1">
        <AccordionHeader>
          <AccordionTrigger>What is Blitz UI?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Blitz UI is a flexible UI library that you can either install as a dependency or copy as
          shadcn-style components for full customization.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="coui-2">
        <AccordionHeader>
          <AccordionTrigger>Who benefits from Blitz UI?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Developers who want the freedom to choose between a drop-in package and self-hosted, fully
          editable components.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="coui-3">
        <AccordionHeader>
          <AccordionTrigger>Why choose Blitz UI?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Blitz UI provides a best-of-both-worlds approach—easy dependency-based usage or
          shadcn-inspired components for total control and customization.
        </AccordionPanel>
      </AccordionItem>
    </AccordionRoot>
  );
}
