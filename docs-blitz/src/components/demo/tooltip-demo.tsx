import { Button } from '@blitz-ui/react/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@blitz-ui/react/tooltip';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
