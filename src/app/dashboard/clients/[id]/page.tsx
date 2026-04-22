import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import ClientDetail from "./ClientDetail";

export const dynamic = "force-dynamic";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return <ClientDetail client={client} />;
}
