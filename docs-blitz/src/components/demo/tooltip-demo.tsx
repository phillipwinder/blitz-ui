import { buttonVariants } from '@blitz-ui/react/button';
import {
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@blitz-ui/react/tooltip';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger className={buttonVariants({ variant: 'outline' })}>Hover</TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}
