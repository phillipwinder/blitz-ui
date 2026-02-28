import { Badge } from '@blitz-ui/react/badge';

export default function BadgeImage() {
  return (
    <div className="flex w-full justify-center flex-wrap gap-2">
      <Badge className="rounded-full ps-[3px]" variant="outline">
        <img
          src="https://github.com/phillipwinder.png"
          className="h-5 w-5 rounded-full"
          alt="Phillip Winder"
          height={20}
          width={20}
        />
        Phillip Winder
      </Badge>
      <Badge className="rounded-full pe-[3px]" variant="outline">
        Phillip Winder
        <img
          src="https://github.com/phillipwinder.png"
          className="h-5 w-5 rounded-full"
          alt="Phillip Winder"
          height={20}
          width={20}
        />
      </Badge>
    </div>
  );
}
