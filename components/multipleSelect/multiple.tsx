"use client";

import { useState } from "react";
import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectCheckboxProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelectCheckbox({
  label,
  options,
  selected,
  onChange,
}: MultiSelectCheckboxProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    const newValues = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newValues);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left">
            {selected.length > 0
              ? options
                  .filter((opt) => selected.includes(opt.value))
                  .map((opt) => opt.label)
                  .join(", ")
              : "Selecione"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggleOption(opt.value)}
                  className="flex items-center justify-between"
                >
                  {opt.label}
                  <Checkbox checked={selected.includes(opt.value)} />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
