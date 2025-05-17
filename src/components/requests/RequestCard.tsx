"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { PairingRequest } from "@/types";
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Send, Clock } from "lucide-react";

interface RequestCardProps {
  request: PairingRequest;
  onUpdateRequestStatus: (requestId: string, newStatus: PairingRequest['status']) => void;
}

export function RequestCard({ request, onUpdateRequestStatus }: RequestCardProps) {
  const { user, skill, message, status, timestamp, type, requestedSkillFocus } = request;
  const { toast } = useToast();

  const handleAccept = () => {
    onUpdateRequestStatus(request.id, "accepted");
    toast({ title: "Request Accepted", description: `You've accepted the request from ${user.name}.`});
  };
  const handleDecline = () => {
    onUpdateRequestStatus(request.id, "declined");
    toast({ title: "Request Declined", description: `You've declined the request from ${user.name}.`, variant: "destructive"});
  };
  const handleCancel = () => {
    onUpdateRequestStatus(request.id, "cancelled");
    toast({ title: "Request Cancelled", description: `You've cancelled your request to ${user.name}.`});
  };

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const statusColors: Record<PairingRequest['status'], string> = {
    pending: "bg-yellow-500 hover:bg-yellow-600",
    accepted: "bg-green-500 hover:bg-green-600",
    declined: "bg-red-500 hover:bg-red-600",
    cancelled: "bg-gray-500 hover:bg-gray-600",
  };

  const StatusIcon = ({ status }: { status: PairingRequest['status']}) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  }


  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 p-4 border-b">
        <UserAvatar user={{...user, dataAiHint: user.dataAiHint || 'person'}} className="h-12 w-12" />
        <div className="flex-grow">
          <CardTitle className="text-xl text-primary">{user.name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">{timeAgo}</CardDescription>
        </div>
        <Badge variant="outline" className={`capitalize text-xs py-1 px-2 ${statusColors[status]} text-white border-none`}>
          <StatusIcon status={status} /> <span className="ml-1">{status}</span>
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm">
          <strong className="font-medium">Skill in focus:</strong> {requestedSkillFocus || skill.name}
        </p>
        {message && (
          <p className="text-sm italic p-3 bg-secondary/50 rounded-md border border-dashed">
            "{message}"
          </p>
        )}
        <p className="text-xs text-muted-foreground">
            {type === 'incoming' ? `Wants to connect with you about ${skill.name}.` : `You requested to connect about ${skill.name}.`}
        </p>
      </CardContent>
      {status === 'pending' && (
        <CardFooter className="p-4 border-t flex justify-end gap-2">
          {type === 'incoming' ? (
            <>
              <Button variant="outline" size="sm" onClick={handleDecline}>Decline</Button>
              <Button size="sm" onClick={handleAccept}>Accept</Button>
            </>
          ) : (
            <Button variant="destructive" size="sm" onClick={handleCancel}>Cancel Request</Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
