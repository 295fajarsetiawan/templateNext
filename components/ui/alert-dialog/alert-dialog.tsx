"use client";

import { Button } from "@/components/ui/button/button";
import { Dialog } from "@/components/ui/dialog/dialog";

type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className,
}: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title} description={description} className={className}>
      <div className="flex items-center gap-3">
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          {cancelText}
        </Button>
      </div>
    </Dialog>
  );
}
