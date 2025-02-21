import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, TruckIcon } from "lucide-react";
import { useState } from "react";
import { Distribution } from "@/types/inventory";
import { Input } from "@/components/ui/input";

const mockDistributions: Distribution[] = [
  {
    id: "1",
    requestId: "REQ-001",
    items: [
      { itemId: "1", quantity: 50 },
      { itemId: "2", quantity: 20 },
    ],
    distributionDate: "2024-02-21",
    status: "in-transit",
    deliveryNote: "Delivery to ICU",
  },
  {
    id: "2",
    requestId: "REQ-002",
    items: [{ itemId: "1", quantity: 30 }],
    distributionDate: "2024-02-20",
    status: "preparing",
    deliveryNote: "Urgent delivery to ER",
  },
];

const statusColors = {
  preparing: "bg-yellow-500",
  "in-transit": "bg-blue-500",
  delivered: "bg-green-500",
};

export default function Distribution() {
  const [distributions] = useState<Distribution[]>(mockDistributions);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistributions = distributions.filter((distribution) => {
    const matchesSearch = distribution.requestId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : distribution.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Distribution</h1>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by request ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distribution ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Distribution Date</TableHead>
                <TableHead>Delivery Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDistributions.map((distribution) => (
                <TableRow key={distribution.id}>
                  <TableCell className="font-medium">
                    #{distribution.id}
                  </TableCell>
                  <TableCell>{distribution.requestId}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusColors[distribution.status]} text-white`}
                    >
                      {distribution.status
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{distribution.distributionDate}</TableCell>
                  <TableCell>{distribution.deliveryNote}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <TruckIcon className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
