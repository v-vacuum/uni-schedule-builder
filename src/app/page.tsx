import { SchedulerProvider } from "@/store/scheduler-context";
import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <SchedulerProvider>
      <AppShell />
    </SchedulerProvider>
  );
}
