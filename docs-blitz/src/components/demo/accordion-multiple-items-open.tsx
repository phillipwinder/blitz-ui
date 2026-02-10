import {
  AccordionPanel,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@blitz-ui/react/accordion';

export default function AccordionMultipleItemsOpen() {
  return (
    <AccordionRoot
      className="w-full max-w-md mx-auto space-y-2"
      defaultValue={[accordionItems[0].value]}
    >
      {accordionItems.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="last:border-b border rounded-md"
        >
          <AccordionHeader>
            <AccordionTrigger className="py-3 px-5 text-base items-center">
              {item.title}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="flex flex-col gap-4 px-5">
            <p>{item.content}</p>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}

const accordionItems = [
  {
    value: 'item-1',
    title: 'Product Information',
    content:
      'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.',
  },
  {
    value: 'item-2',
    title: 'Shipping Details',
    content:
      'We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.',
  },
  {
    value: 'item-3',
    title: 'Return Policy',
    content:
      "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
  },
];
