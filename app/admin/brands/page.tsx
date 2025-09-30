import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/authOptions";
import { prisma } from "@/lib/server/prisma";
import BrandsClient from "./table.client";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BrandsAdminPage() {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.isAdmin)
    return <div className="p-6">Unauthorized</div>;
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="text-xs px-2 py-1 rounded border bg-white hover:bg-neutral-50"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight flex-1">
          Manage Brands
        </h1>
      </div>
      <BrandsClient initial={brands.map((b) => ({ id: b.id, name: b.name }))} />
    </div>
  );
}
