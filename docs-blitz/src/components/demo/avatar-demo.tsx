import { Avatar } from '@blitz-ui/react/avatar';

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>

      <Avatar className="rounded-lg">
        <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>

      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
          <Avatar.Fallback>LR</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <Avatar.Fallback>ER</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
}
