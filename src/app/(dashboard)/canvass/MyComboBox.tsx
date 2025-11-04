"use client";
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

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function MyComboBox() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const frameworks = [
        {
            value: "home",
            label: "Home 1",
        },
        {
            value: "office",
            label: "Office",
        },
        {
            value: "cebu",
            label: "Cebu",
        },
        {
            value: "partner",
            label: "Partner",
        },
        {
            value: "parents",
            label: "Parents",
        },
    ];
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[30%] col-span-2 justify-end p-1 bg-white rounded-[.5rem] text-[#94A3B8] border-[1px] border-[#94A3B8] lg:col-span-3 lg:justify-center"
                >
                    <p className="hidden text-sm lg:block">
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select Address..."}
                    </p>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] bg-white border-none p-0">
                <Command>
                    <CommandInput placeholder="Choose address..." />
                    <CommandList>
                        <CommandEmpty>No Address Found</CommandEmpty>
                        <CommandGroup className="bg-white">
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
