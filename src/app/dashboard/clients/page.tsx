import { getClients } from "@/lib/store";
import { ClientList } from "@/components/dashboard/ClientList";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div>
          <h1 className="font-heading text-xl font-bold text-text sm:text-2xl">
            내담자 관리
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {clients.length > 0
              ? `총 ${clients.length}명의 내담자`
              : "등록된 내담자가 없습니다"}
          </p>
        </div>
      </div>

      <ClientList clients={clients} showHeaderAction={false} />
    </div>
  );
}
