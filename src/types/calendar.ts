export interface CalendarDate {
    date: string // Format: "YYYY-MM-DD"
    day: number
    month: number
    year: number
  }
  
  export interface CalendarEvent {
    id: string
    title: string
    description?: string
    date: string // Format: "YYYY-MM-DD"
    createdAt: string
    updatedAt: string
  }
  