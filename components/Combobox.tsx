import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryTypes } from "@/lib/lists";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <input type="hidden" name="category" value={value} />
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="category"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between !startup-form_input"
          >
            {value
              ? CategoryTypes.find((category) => category.value === value)
                  ?.title
              : "Select category..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="ml-6 w-full p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search category..." className="h-9" />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {CategoryTypes.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    className=" hover:bg-primary hover:text-white"
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {category.title}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === category.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default Combobox;
