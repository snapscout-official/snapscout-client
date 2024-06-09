import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
type imageProp = {
  file: File;
  designation: string;
};
export default function PhilgepAccordion({
  image,
}: {
  image: imageProp | null;
}) {
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>Philgep Identification</AccordionTrigger>
      <AccordionContent>
        {image ? (
          <Image
            src={URL.createObjectURL(image.file)}
            alt="Testing"
            width={200}
            height={200}
          />
        ) : (
          "Philgep Image must be here"
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
