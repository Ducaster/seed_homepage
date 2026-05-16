import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import ClientDetail from "./ClientDetail";

export const dynamic = "force-dynamic";

export default async function ClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; edit?: string }>;
}) {
  const { id } = await params;
  const { error, edit } = await searchParams;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetail client={client} error={error} startEditing={edit === "1"} />
  );
}
