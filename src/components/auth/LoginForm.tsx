
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useRouter } from "next/navigation";
import { currentMockUser } from "@/lib/mockData"; // For demo
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log("Login submitted with:", values);
    // In a real app, you'd call an API endpoint here.
    // For demo, we'll use mock user if email matches.
    if (values.email === currentMockUser.email) {
      login(currentMockUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${currentMockUser.name}!`,
      });
      router.push("/dashboard");
    } else {
      // Generic user login for demo
      const genericUser = { ...currentMockUser, email: values.email, name: "Demo User" };
      login(genericUser);
      toast({
        title: "Login Successful",
        description: "Welcome to EduPair!",
      });
      router.push("/dashboard");
    }
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "Feature Coming Soon",
      description: "Forgot password functionality is not yet implemented.",
    });
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">Login to EduPair</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            Register here
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="#" className="text-xs text-muted-foreground hover:underline" onClick={handleForgotPassword}>
            Forgot password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
