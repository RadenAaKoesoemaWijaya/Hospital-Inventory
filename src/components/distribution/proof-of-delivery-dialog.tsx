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
import { format } from "date-fns";
import { Download } from "lucide-react";
import { useState } from "react";

interface ProofOfDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    receivedBy: string;
    signature: string;
    notes: string;
  }) => void;
  deliveryDetails: {
    id: string;
    date: Date;
    items: Array<{
      name: string;
      quantity: number;
    }>;
  };
}

export function ProofOfDeliveryDialog({
  open,
  onOpenChange,
  onSubmit,
  deliveryDetails,
}: ProofOfDeliveryDialogProps) {
  const [receivedBy, setReceivedBy] = useState("");
  const [signature, setSignature] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      receivedBy,
      signature,
      notes,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bukti Pengiriman</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                Delivery #: {deliveryDetails.id}
              </h3>
              <p className="text-sm text-muted-foreground">
                Date: {format(deliveryDetails.date, "PPP")}
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {deliveryDetails.items.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-2">{item.name}</td>
                    <td className="text-right py-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="receivedBy">Diterima Oleh</Label>
                <Input
                  id="receivedBy"
                  value={receivedBy}
                  onChange={(e) => setReceivedBy(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signature">Tanda Tangan</Label>
                <Input
                  id="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Ketik nama lengkap sebagai tanda tangan"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Catatan</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan catatan tentang pengiriman"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Cetak Bukti
              </Button>
              <Button type="submit">Konfirmasi Pengiriman</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
