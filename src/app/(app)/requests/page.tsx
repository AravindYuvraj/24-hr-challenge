"use client";

import { RequestList } from "@/components/requests/RequestList";

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Pairing Requests</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your incoming and outgoing skill exchange requests.
        </p>
      </div>
      <RequestList />
    </div>
  );
}
