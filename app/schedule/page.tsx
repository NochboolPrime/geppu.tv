import { getReleasesByWeekday } from "@/lib/db"
import { ScheduleClient } from "@/components/schedule-client"

export default async function SchedulePage() {
  const releases = await getReleasesByWeekday()

  return <ScheduleClient releases={releases} />
}
