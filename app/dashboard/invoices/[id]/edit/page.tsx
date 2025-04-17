import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // 确保 params 是一个普通对象而不是 Promise
  const id = params.id;
  console.log(`当前编辑的发票ID: ${id}`);
  
  try {
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);
    
    if (!invoice) notFound();
    
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Invoices", href: "/dashboard/invoices" },
            {
              label: "Edit Invoice",
              href: `/dashboard/invoices/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form invoice={invoice} customers={customers} />
      </main>
    );
  } catch (error) {
    console.error("Error loading invoice:", error);
    notFound();
  }
}
