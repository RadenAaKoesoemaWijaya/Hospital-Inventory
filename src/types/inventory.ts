export interface Item {
  id: string;
  name: string;
  code: string;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  location: string;
  expiryDate?: string;
}

export interface Request {
  id: string;
  unitId: string;
  unitName: string;
  status: "pending" | "approved" | "rejected" | "delivered";
  items: {
    itemId: string;
    quantity: number;
  }[];
  requestDate: string;
  requiredDate: string;
  priority: "low" | "medium" | "high";
}

export interface Distribution {
  id: string;
  requestId: string;
  items: {
    itemId: string;
    quantity: number;
  }[];
  distributionDate: string;
  status: "preparing" | "in-transit" | "delivered";
  deliveryNote: string;
}
