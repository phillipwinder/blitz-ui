import { Label } from '@blitz-ui/react/label';
import { RadioGroup, RadioGroupItem } from '@blitz-ui/react/radio-group';

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup defaultValue="comfortable" className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="horizontal-r1" />
        <Label htmlFor="horizontal-r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="horizontal-r2" />
        <Label htmlFor="horizontal-r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="horizontal-r3" />
        <Label htmlFor="horizontal-r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
