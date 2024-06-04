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
export default function BusinessAccordion({
  image,
}: {
  image: imageProp | null;
}) {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Bussiness Permit </AccordionTrigger>
      <AccordionContent>
        {image ? (
          <Image
            src={URL.createObjectURL(image.file)}
            alt="Testing"
            width={200}
            height={200}
          />
        ) : (
          "Business Permit must be here"
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
