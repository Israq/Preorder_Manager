"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PreorderForm } from "@/components/preorder-form";

type Preorder = {
  id: string;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string | null;
  status: boolean;
  createdAt: string;
};

export default function EditPreorderPage() {
  const params = useParams();
  const id = params.id as string;
  const [preorder, setPreorder] = useState<Preorder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreorder() {
      try {
        const res = await fetch(`/api/preorders?pageSize=100`);
        const data = await res.json();
        const found = data.preorders.find((p: Preorder) => p.id === id);
        setPreorder(found || null);
      } catch (error) {
        console.error("Failed to fetch preorder:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPreorder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!preorder) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <p className="text-gray-400">Preorder not found</p>
      </div>
    );
  }

  return <PreorderForm preorder={preorder} isEditing />;
}
