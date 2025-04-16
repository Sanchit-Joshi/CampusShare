
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Filter, Check, X } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  condition: string;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [condition, setCondition] = useState<string>("");

  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      condition,
    });
    setIsOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 200]);
    setCondition("");
    onFilterChange({
      priceRange: [0, 200],
      condition: "",
    });
  };

  return (
    <div className="relative mb-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full md:w-80 rounded-lg border bg-card p-4 shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Listings</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price-range">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="condition">
              <AccordionTrigger>Condition</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={condition}
                  onValueChange={handleConditionChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="New" id="new" />
                    <Label htmlFor="new">New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Good" id="good" />
                    <Label htmlFor="good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Fair" id="fair" />
                    <Label htmlFor="fair">Fair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="any" />
                    <Label htmlFor="any">Any Condition</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-between mt-4 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset
            </Button>
            <Button size="sm" onClick={applyFilters}>
              <Check className="mr-1 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
