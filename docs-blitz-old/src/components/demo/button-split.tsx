import { Button } from '@blitz-ui/react/button';
import { ChevronDown, SendHorizonal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@blitz-ui/react/dropdown-menu';

export default function ButtonSplit() {
  return (
    <div className="flex">
      <Button className="rounded-r-none border-e border-primary-foreground/20">
        Send <SendHorizonal className="ml-1" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button className="rounded-l-none" />}>
          <ChevronDown />
        </DropdownMenuTrigger>
        {/* <DropdownMenuPositioner> */}
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Schedule at</DropdownMenuLabel>
            <DropdownMenuItem>Today 9:00 AM</DropdownMenuItem>
            <DropdownMenuItem>Tomorrow 10:00 AM</DropdownMenuItem>
            <DropdownMenuItem>Next week 11:00 AM</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Custom Schedule</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        {/* </DropdownMenuPositioner> */}
      </DropdownMenu>
    </div>
  );
}
