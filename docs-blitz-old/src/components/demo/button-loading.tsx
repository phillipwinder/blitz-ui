import { Loader } from 'lucide-react';
import { Button } from '@blitz-ui/react/button';

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button size="icon">
        <Loader className="animate-spin" />
      </Button>
      <Button>
        <Loader className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
