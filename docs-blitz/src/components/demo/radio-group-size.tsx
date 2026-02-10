import { Label } from '@blitz-ui/react/label';
import { RadioGroup, RadioGroupItem } from '@blitz-ui/react/radio-group';

export default function RadioGroupSize() {
  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="size-r1" />
        <Label htmlFor="size-r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="medium" id="size-r2" className="size-5 [&_svg]:size-2.5" />
        <Label htmlFor="size-r2">Medium</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="large" id="size-r3" className="size-6 [&_svg]:size-3" />
        <Label htmlFor="size-r3">Large</Label>
      </div>
    </RadioGroup>
  );
}
