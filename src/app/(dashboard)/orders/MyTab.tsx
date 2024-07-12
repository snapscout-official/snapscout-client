"use client";
import { Tab } from "@nextui-org/tabs";

export default function MyTab({
  children,
  key,
}: {
  children: React.ReactNode;
  key: string;
}) {
  return <Tab key={key}>{children}</Tab>;
}
