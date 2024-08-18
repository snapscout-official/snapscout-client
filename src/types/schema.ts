import { z } from "zod";
export const merchantTwoSchema = z.object({
  businessName: z
    .string({ required_error: "Must be a string" })
    .min(4, { message: "Business name must be 4 characters long" }),
  location: z
    .string({ required_error: "Must be a string" })
    .min(1, { message: "street name is required" }),
  latitude: z.number(),
  longitude: z.number(),
});
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const merchantThreeSchema = z.object({
  accepts: z.boolean({ required_error: "Must accept" }),
  businessPermit: z
    .instanceof(FileList)
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  philgeps: z
    .instanceof(FileList)
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});
export const merchantStepFourSchema = z.object({
  accepts: z.boolean().refine((isAccepted) => {
    return isAccepted;
  }, "Must accept terms and conditions"),
});
