"use client";

import { Tab, Tabs } from "@nextui-org/tabs";

type MyTabsProps = {
  aria_label: string;
  variant: "solid" | "underlined" | "bordered" | "light";
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  fullWidth: boolean;
};
type TabItem = {
  id: string;
  label: string;
  component: JSX.Element;
};
//add essential props for this component
export default function MyTabs({
  prop,
  tab_items,
}: {
  prop: MyTabsProps;
  tab_items: TabItem[];
}) {
  return (
    <Tabs
      aria-label={prop.aria_label}
      variant={prop.variant}
      color={prop.color}
      fullWidth
      items={tab_items}
    >
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.component}
        </Tab>
      )}
    </Tabs>
  );
}
