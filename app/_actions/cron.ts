"use server"

import { cronTask } from "@/lib/cron-task"

export async function statisticCronTask() {
  try {
    await cronTask()
  } catch (error) {
    console.log(error)
  }
}
