import { Avatar, AvatarFallback, AvatarImage } from '@blitz-ui/react/avatar';

export default function AvatarRing() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-10 ring-2 ring-ring ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback className="rounded-none">ER</AvatarFallback>
      </Avatar>
      <Avatar className="size-10 ring-2 ring-green-500 ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/leerob.png" alt="@evilrabbit" />
        <AvatarFallback className="rounded-md">LR</AvatarFallback>
      </Avatar>
      <div className="bg-gradient-to-b from-red-500 to-blue-500 rounded-full p-1">
        <Avatar className="size-10 ring-2 ring-background">
          <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>PW</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
