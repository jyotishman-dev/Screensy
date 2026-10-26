"use client"
import { getMe } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
 const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();

        setUser(data);
        toast.success(`Welcome ${data.user?.email ?? "user"}`);
      } catch (error) {
        toast.warning("Hey, please login to continue");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mt-2 text-muted-foreground">
        Welcome {user.user?.email ?? "user"}.
      </p>
    </main>
  );
}