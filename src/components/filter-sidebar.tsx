"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterSidebar() {
  return (
    <div className="space-y-8 p-6 glass-morphism rounded-2xl border sticky top-24">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Sort Results</h3>
        <Select defaultValue="relevance">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="citations">Citations (Most)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Domain</h3>
        <div className="space-y-3">
          {["Computer Science", "Medicine", "Biology", "Physics", "Economics"].map((domain) => (
            <div key={domain} className="flex items-center space-x-2">
              <Checkbox id={domain} />
              <Label htmlFor={domain} className="text-sm font-medium">{domain}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Publication Year</h3>
        <div className="pt-2">
          <Slider defaultValue={[2010]} max={2024} min={1990} step={1} className="mb-6" />
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>1990</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Open Access</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="oa" />
          <Label htmlFor="oa" className="text-sm font-medium">Free Full-Text PDF only</Label>
        </div>
      </div>
    </div>
  );
}