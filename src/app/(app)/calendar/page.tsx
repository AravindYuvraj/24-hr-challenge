
"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPairingRequests } from "@/lib/mockData";
import type { PairingRequest } from "@/types";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CalendarDays } from "lucide-react"; // Added CalendarDays
import { format } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  const acceptedRequests = React.useMemo(() => {
    return mockPairingRequests.filter((req) => req.status === "accepted");
  }, []);

  const eventsOnSelectedDate = React.useMemo(() => {
    if (!selectedDate) return [];
    return acceptedRequests.filter((req) => {
      const eventDate = new Date(req.timestamp);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });
  }, [selectedDate, acceptedRequests]);

  const eventDays = React.useMemo(() => {
    return acceptedRequests.map((req) => new Date(req.timestamp));
  }, [acceptedRequests]);

  const modifiers = {
    eventDay: eventDays,
    selected: selectedDate,
  };

  const modifiersStyles = {
    eventDay: {
      border: "2px solid hsl(var(--accent))",
      borderRadius: "9999px",
      fontWeight: "bold" as "bold",
    },
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Pairing Calendar
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View your scheduled skill exchange sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-lg">
          <CardContent className="p-2 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md "
              ISOWeek
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-primary">
              Sessions for{" "}
              {selectedDate
                ? format(selectedDate, "PPP")
                : "Selected Date"}
            </CardTitle>
            <CardDescription>
              {eventsOnSelectedDate.length > 0
                ? `You have ${eventsOnSelectedDate.length} session(s).`
                : "No sessions scheduled for this day."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {eventsOnSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsOnSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <UserAvatar user={event.user} className="h-8 w-8" />
                        <span className="font-semibold text-foreground/90">
                          {event.user.name}
                        </span>
                      </div>
                      <p className="text-sm flex items-center gap-2 mb-1">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span className="font-medium">Skill:</span>{" "}
                        {event.requestedSkillFocus || event.skill.name}
                      </p>
                       <p className="text-sm flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="font-medium">Time:</span>{" "}
                        {format(new Date(event.timestamp), "p")}
                      </p>
                      {event.message && (
                         <p className="text-xs text-muted-foreground mt-2 p-2 bg-secondary/30 rounded-md border border-dashed">
                          <span className="font-medium">Notes/Message:</span> {event.message}
                        </p>
                      )}
                       <div className="mt-2">
                        <Badge variant={event.type === 'incoming' ? "secondary" : "outline"}>
                            {event.type === 'incoming' ? 'Incoming Request' : 'Outgoing Request'}
                        </Badge>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <CalendarDays className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    No sessions scheduled on this day.
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    Select another date or check your pending requests.
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
