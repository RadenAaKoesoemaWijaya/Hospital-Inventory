import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemFormDialog } from "@/components/inventory/item-form-dialog";
import { StockAdjustmentDialog } from "@/components/inventory/stock-adjustment-dialog";
import { BarcodeScannerDialog } from "@/components/inventory/barcode-scanner-dialog";
import { ReceiptDialog } from "@/components/inventory/receipt-dialog";
import { Plus, Search, Scan, Edit, BarChart2 } from "lucide-react";
import { useState } from "react";
import { Item } from "@/types/inventory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockItems: Item[] = [
  {
    id: "1",
    name: "Surgical Mask",
    code: "SM001",
    category: "PPE",
    unit: "box",
    currentStock: 500,
    minimumStock: 100,
    location: "Warehouse A-1",
    expiryDate: "2024-12-31",
  },
  {
    id: "2",
    name: "Hand Sanitizer",
    code: "HS001",
    category: "Hygiene",
    unit: "bottle",
    currentStock: 200,
    minimumStock: 50,
    location: "Warehouse B-2",
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Item[]>(mockItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStockAdjustmentOpen, setIsStockAdjustmentOpen] = useState(false);
  const [isBarcodeDialogOpen, setIsBarcodeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddItem = (data: Partial<Item>) => {
    const newItem: Item = {
      id: String(items.length + 1),
      ...(data as Item),
    };
    setItems([...items, newItem]);
  };

  const handleEditItem = (data: Partial<Item>) => {
    if (!selectedItem) return;
    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? { ...item, ...data } : item,
    );
    setItems(updatedItems);
  };

  const handleStockAdjustment = (data: {
    quantity: number;
    type: "add" | "remove";
    reason: string;
  }) => {
    if (!selectedItem) return;
    const updatedItems = items.map((item) => {
      if (item.id === selectedItem.id) {
        const newStock =
          data.type === "add"
            ? item.currentStock + data.quantity
            : item.currentStock - data.quantity;
        return { ...item, currentStock: newStock };
      }
      return item;
    });
    setItems(updatedItems);

    // Generate receipt for stock adjustment
    if (data.type === "add") {
      setReceiptData({
        id: `REC-${Date.now()}`,
        date: new Date(),
        items: [
          {
            name: selectedItem.name,
            quantity: data.quantity,
            unit: selectedItem.unit,
          },
        ],
        totalItems: data.quantity,
        receivedBy: "John Doe", // This would come from the logged-in user
      });
      setIsReceiptDialogOpen(true);
    }
  };

  const handleBarcodeScan = (code: string) => {
    const item = items.find((item) => item.code === code);
    if (item) {
      setSelectedItem(item);
      setIsStockAdjustmentOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventaris</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsBarcodeDialogOpen(true)}>
            <Scan className="h-4 w-4 mr-2" />
            Pindai Barcode
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Tanggal Kadaluarsa</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.currentStock <= item.minimumStock
                          ? "text-red-500 font-medium"
                          : ""
                      }
                    >
                      {item.currentStock}
                    </span>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.expiryDate || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(item);
                            setIsStockAdjustmentOpen(true);
                          }}
                        >
                          <BarChart2 className="h-4 w-4 mr-2" />
                          Sesuaikan Stok
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ItemFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddItem}
      />

      <ItemFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditItem}
        item={selectedItem || undefined}
      />

      {selectedItem && (
        <StockAdjustmentDialog
          open={isStockAdjustmentOpen}
          onOpenChange={setIsStockAdjustmentOpen}
          onSubmit={handleStockAdjustment}
          item={selectedItem}
        />
      )}

      <BarcodeScannerDialog
        open={isBarcodeDialogOpen}
        onOpenChange={setIsBarcodeDialogOpen}
        onScan={handleBarcodeScan}
      />

      {receiptData && (
        <ReceiptDialog
          open={isReceiptDialogOpen}
          onOpenChange={setIsReceiptDialogOpen}
          receiptData={receiptData}
        />
      )}
    </div>
  );
}
