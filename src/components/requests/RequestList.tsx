"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestCard } from "./RequestCard";
import type { PairingRequest } from "@/types";
import { mockPairingRequests } from "@/lib/mockData"; // For demo
import { Inbox, Send } from "lucide-react";

export function RequestList() {
  const [requests, setRequests] = useState<PairingRequest[]>(mockPairingRequests);

  // Simulate fetching and updating requests
  const updateRequestStatus = (requestId: string, newStatus: PairingRequest['status']) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const incomingRequests = requests.filter(req => req.type === 'incoming');
  const outgoingRequests = requests.filter(req => req.type === 'outgoing');

  return (
    <Tabs defaultValue="incoming" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="incoming" className="gap-2">
            <Inbox className="h-4 w-4" /> Incoming ({incomingRequests.filter(r => r.status === 'pending').length})
        </TabsTrigger>
        <TabsTrigger value="outgoing" className="gap-2">
            <Send className="h-4 w-4" /> Outgoing ({outgoingRequests.filter(r => r.status === 'pending').length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="incoming">
        {incomingRequests.length > 0 ? (
          <div className="space-y-4">
            {incomingRequests.map((request) => (
              <RequestCard key={request.id} request={request} onUpdateRequestStatus={updateRequestStatus} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No incoming requests.</p>
        )}
      </TabsContent>
      <TabsContent value="outgoing">
        {outgoingRequests.length > 0 ? (
          <div className="space-y-4">
            {outgoingRequests.map((request) => (
              <RequestCard key={request.id} request={request} onUpdateRequestStatus={updateRequestStatus} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No outgoing requests sent.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
