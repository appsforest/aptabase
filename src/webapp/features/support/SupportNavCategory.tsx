import { IconGift } from "@tabler/icons-react";
import { NavCategory, NavItem } from "../navigation";

export function SupportNavCategory() {
  return (
    <NavCategory title="Product">
      <NavItem label="Affiliates" href="https://aptabase.lemonsqueezy.com/affiliates" icon={IconGift} />
    </NavCategory>
  );
}
