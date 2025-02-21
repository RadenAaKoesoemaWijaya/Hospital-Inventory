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
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Request } from "@/types/inventory";
import { Input } from "@/components/ui/input";

const mockRequests: Request[] = [
  {
    id: "1",
    unitId: "ICU-01",
    unitName: "Intensive Care Unit",
    status: "pending",
    items: [
      { itemId: "1", quantity: 50 },
      { itemId: "2", quantity: 20 },
    ],
    requestDate: "2024-02-21",
    requiredDate: "2024-02-23",
    priority: "high",
  },
  {
    id: "2",
    unitId: "ER-01",
    unitName: "Emergency Room",
    status: "approved",
    items: [{ itemId: "1", quantity: 30 }],
    requestDate: "2024-02-20",
    requiredDate: "2024-02-22",
    priority: "medium",
  },
];

const statusColors = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
  delivered: "bg-blue-500",
};

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export default function Requests() {
  const [requests] = useState<Request[]>(mockRequests);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unitId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Requests</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Required Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">#{request.id}</TableCell>
                  <TableCell>
                    {request.unitName}
                    <br />
                    <span className="text-sm text-muted-foreground">
                      {request.unitId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusColors[request.status]} text-white`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${priorityColors[request.priority]} text-white`}
                    >
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.requiredDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
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
