import { Avatar, AvatarFallback, AvatarImage } from '@blitz-ui/react/avatar';

export default function AvatarDefault() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback>PW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
  );
}
