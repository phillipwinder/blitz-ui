import { Avatar, AvatarFallback, AvatarImage } from '@blitz-ui/react/avatar';

export default function AvatarStatus() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
          <AvatarFallback>PW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-gray-400"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
          <AvatarFallback>PW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-green-500"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
          <AvatarFallback>PW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-amber-500"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
          <AvatarFallback>PW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 size-2 ring-2 ring-background rounded-full bg-red-500"></div>
      </div>
    </div>
  );
}
