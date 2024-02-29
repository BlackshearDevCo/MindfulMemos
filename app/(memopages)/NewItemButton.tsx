import React from "react";
import { Button } from "@/components/ui/Button";
import FormDialog, { FormItemType } from "@/app/(memopages)/tasks/FormDialog";
import { Task, Thought } from "@/lib/types";

type Props = {
  itemType: FormItemType;
  item?: Task | Thought;
};

export function NewItemButton({ itemType }: Props) {
  return (
    <FormDialog
      itemType={itemType}
      title={`Create ${itemType}`}
      description={`Enter the details of your new ${itemType} below.`}
    >
      <Button variant="default" className="uppercase">
        Add new {itemType}
      </Button>
    </FormDialog>
  );
}
