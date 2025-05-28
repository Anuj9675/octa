import { atom } from "recoil"

export interface EventItem {
  id: string
  date: string // format: YYYY-MM-DD
  title: string
}

export const eventsState = atom<EventItem[]>({
  key: "eventsState",
  default: [
    {
      id: "1",
      date: "2025-05-28",
      title: "Sample Event A",
    },
    {
      id: "2",
      date: "2025-05-30",
      title: "Sample Event B",
    },
  ],
})
