
"use client";

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { mockUserProfiles, mockPairingRequests, currentMockUser } from '@/lib/mockData';
import { useAuthStore } from '@/hooks/use-auth-store';
import { TrendingUp, Users, CheckCircle, XCircle, Send, MessageSquare } from 'lucide-react';

interface SkillCount {
  name: string;
  count: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description }) => (
  <Card className="shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const truncateLabel = (label: string, maxLength = 15) => {
  if (label.length > maxLength) {
    return `${label.substring(0, maxLength - 3)}...`;
  }
  return label;
};

export default function AnalyticsPage() {
  const authUser = useAuthStore((state) => state.user);
  const userForStats = authUser || currentMockUser; // Fallback for demo if authUser is null

  const platformSkillTrends = useMemo(() => {
    const allTeachSkills = mockUserProfiles.flatMap(profile => profile.teachSkills.map(skill => skill.name));
    const teachSkillCounts = allTeachSkills.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTeachSkills: SkillCount[] = Object.entries(teachSkillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const allLearnSkills = mockUserProfiles.flatMap(profile => profile.learnSkills.map(skill => skill.name));
    const learnSkillCounts = allLearnSkills.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topLearnSkills: SkillCount[] = Object.entries(learnSkillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return { topTeachSkills, topLearnSkills };
  }, []);

  const userPairingStats = useMemo(() => {
    if (!userForStats) return null; // Should ideally not happen on an authenticated page

    // These stats are based on mockPairingRequests which are from Alice's (currentMockUser) perspective
    // In a real app, these would be filtered by the actual currentUser.id
    const requestsSent = mockPairingRequests.filter(r => r.type === 'outgoing').length;
    const sessionsAccepted = mockPairingRequests.filter(r => r.status === 'accepted').length;
    const requestsIDeclined = mockPairingRequests.filter(r => r.type === 'incoming' && r.status === 'declined').length;
    const requestsOthersDeclinedOrICancelled = mockPairingRequests.filter(r => r.type === 'outgoing' && (r.status === 'declined' || r.status === 'cancelled')).length;

    const acceptedUserRequests = mockPairingRequests.filter(r => r.status === 'accepted');
    const skillFocusCounts = acceptedUserRequests.reduce((acc, req) => {
      const skillName = req.requestedSkillFocus || req.skill.name;
      acc[skillName] = (acc[skillName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostMatchedSkillEntry = Object.entries(skillFocusCounts).sort(([, a], [, b]) => b - a)[0];
    const mostMatchedSkill = mostMatchedSkillEntry ? `${mostMatchedSkillEntry[0]} (${mostMatchedSkillEntry[1]} session(s))` : 'N/A';

    return {
      requestsSent,
      sessionsAccepted,
      requestsIDeclined,
      requestsOthersDeclinedOrICancelled,
      mostMatchedSkill,
    };
  }, [userForStats]);

  const teachSkillsChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    platformSkillTrends.topTeachSkills.forEach((skill, index) => {
      config[skill.name] = {
        label: skill.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
    });
    return config;
  }, [platformSkillTrends.topTeachSkills]);

  const learnSkillsChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    platformSkillTrends.topLearnSkills.forEach((skill, index) => {
      config[skill.name] = {
        label: skill.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
    });
    return config;
  }, [platformSkillTrends.topLearnSkills]);

  if (!userPairingStats) {
    return <div className="container mx-auto py-8 text-center">Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Skill Trends &amp; Analytics</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Insights into platform skill popularity and your pairing activity.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><TrendingUp className="mr-2 h-6 w-6" />Platform Skill Trends</CardTitle>
          <CardDescription>Top skills being taught and learned across SkillSwap.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-center text-foreground/90">Top 5 Teach Skills</h3>
            {platformSkillTrends.topTeachSkills.length > 0 ? (
              <ChartContainer config={teachSkillsChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformSkillTrends.topTeachSkills} layout="vertical" margin={{ right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tickFormatter={(value) => truncateLabel(value, 12)}
                      width={80}
                      interval={0}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Users Teaching" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : <p className="text-center text-muted-foreground">Not enough data for teach skill trends.</p>}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-center text-foreground/90">Top 5 Learn Skills</h3>
             {platformSkillTrends.topLearnSkills.length > 0 ? (
              <ChartContainer config={learnSkillsChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformSkillTrends.topLearnSkills} layout="vertical" margin={{ right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} />
                     <YAxis 
                      dataKey="name" 
                      type="category" 
                      tickFormatter={(value) => truncateLabel(value, 12)}
                      width={80}
                      interval={0}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                     <Bar dataKey="count" name="Users Learning" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
             ) : <p className="text-center text-muted-foreground">Not enough data for learn skill trends.</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><Users className="mr-2 h-6 w-6" />Your Pairing Stats ({userForStats.name})</CardTitle>
          <CardDescription>An overview of your skill exchange activities.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Requests Sent" 
            value={userPairingStats.requestsSent} 
            icon={Send}
            description="Total pairing requests you've initiated." 
          />
          <StatCard 
            title="Sessions Accepted" 
            value={userPairingStats.sessionsAccepted} 
            icon={CheckCircle}
            description="Pairing requests that were accepted (yours or theirs)." 
          />
          <StatCard 
            title="Requests You Declined" 
            value={userPairingStats.requestsIDeclined} 
            icon={XCircle}
            description="Incoming requests you chose to decline." 
          />
          <StatCard 
            title="Declined by Others / Cancelled" 
            value={userPairingStats.requestsOthersDeclinedOrICancelled} 
            icon={XCircle}
            description="Requests declined by others or cancelled by you." 
          />
          <StatCard 
            title="Most Matched Skill" 
            value={userPairingStats.mostMatchedSkill} 
            icon={MessageSquare}
            description="Skill most frequently involved in your accepted sessions." 
          />
        </CardContent>
      </Card>
    </div>
  );
}
