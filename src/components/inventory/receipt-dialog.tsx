import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Download } from "lucide-react";

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: {
    id: string;
    date: Date;
    items: Array<{
      name: string;
      quantity: number;
      unit: string;
    }>;
    totalItems: number;
    receivedBy: string;
  };
}

export function ReceiptDialog({
  open,
  onOpenChange,
  receiptData,
}: ReceiptDialogProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tanda Terima Digital</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 print:p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Receipt #: {receiptData.id}</h3>
              <p className="text-sm text-muted-foreground">
                Date: {format(receiptData.date, "PPP")}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold">Sistem Inventaris Rumah Sakit</h3>
              <p className="text-sm text-muted-foreground">
                Tanda Terima Digital
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Unit</th>
                </tr>
              </thead>
              <tbody>
                {receiptData.items.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-2">{item.name}</td>
                    <td className="text-right py-2">{item.quantity}</td>
                    <td className="text-right py-2">{item.unit}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td className="py-2">Total Items</td>
                  <td className="text-right py-2" colSpan={2}>
                    {receiptData.totalItems}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm">Received by: {receiptData.receivedBy}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Cetak Tanda Terima
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
