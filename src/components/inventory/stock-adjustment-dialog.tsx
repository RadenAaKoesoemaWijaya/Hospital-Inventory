import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@/types/inventory";
import { useState } from "react";

interface StockAdjustmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    quantity: number;
    type: "add" | "remove";
    reason: string;
  }) => void;
  item: Item;
}

const reasons = [
  "New Stock Arrival",
  "Stock Count Adjustment",
  "Damaged Goods",
  "Expired Items",
  "Other",
];

export function StockAdjustmentDialog({
  open,
  onOpenChange,
  onSubmit,
  item,
}: StockAdjustmentDialogProps) {
  const [adjustmentData, setAdjustmentData] = useState({
    quantity: 0,
    type: "add" as const,
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(adjustmentData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Stock - {item.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Current Stock: {item.currentStock}</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Adjustment Type</Label>
              <Select
                value={adjustmentData.type}
                onValueChange={(value: "add" | "remove") =>
                  setAdjustmentData({ ...adjustmentData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock</SelectItem>
                  <SelectItem value="remove">Remove Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={adjustmentData.quantity}
                onChange={(e) =>
                  setAdjustmentData({
                    ...adjustmentData,
                    quantity: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Select
                value={adjustmentData.reason}
                onValueChange={(value) =>
                  setAdjustmentData({ ...adjustmentData, reason: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Adjust Stock</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
