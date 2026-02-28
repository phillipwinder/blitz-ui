import { Avatar, AvatarFallback, AvatarImage } from '@blitz-ui/react/avatar';

export default function AvatarSize() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-9">
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback>PW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback className="rounded-md">LR</AvatarFallback>
      </Avatar>
      <Avatar className="size-7">
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback className="rounded-none">ER</AvatarFallback>
      </Avatar>
    </div>
  );
}
