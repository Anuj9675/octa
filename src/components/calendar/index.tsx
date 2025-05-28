"use client"

import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface CalendarProps {
  selectedDate: string
  onSelectDate: (date: string) => void
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const calendarDays = []

  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null)
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day)

  const goToPrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = prev.getMonth() - 1
      return new Date(prevMonth < 0 ? prev.getFullYear() - 1 : prev.getFullYear(), (prevMonth + 12) % 12, 1)
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = prev.getMonth() + 1
      return new Date(nextMonth > 11 ? prev.getFullYear() + 1 : prev.getFullYear(), nextMonth % 12, 1)
    })
  }

  const formatDate = (d: number) => {
    const m = month + 1
    const mm = m < 10 ? `0${m}` : m
    const dd = d < 10 ? `0${d}` : d
    return `${year}-${mm}-${dd}`
  }

  return (
    <div className="p-4 text-sm text-white select-none w-full bg-indigo-950 border border-indigo-900 rounded shadow-lg">
      <div className="mb-4 flex items-center justify-between font-semibold">
        <button onClick={goToPrevMonth} aria-label="Previous Month" className="p-2 hover:bg-gray-700 rounded">
          <FaChevronLeft />
        </button>

        <div>
          {monthNames[month]} {year}
        </div>

        <button onClick={goToNextMonth} aria-label="Next Month" className="p-2 hover:bg-gray-700 rounded">
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-white">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 sm:gap-4 md:gap-5">
        {calendarDays.map((day, idx) =>
          day ? (
            <button
              key={idx}
              onClick={() => onSelectDate(formatDate(day))}
              className={`text-center py-3 rounded cursor-pointer transition-colors duration-200
                ${
                  selectedDate === formatDate(day)
                    ? "bg-indigo-600 font-semibold text-white"
                    : "hover:bg-indigo-700 text-gray-200"
                }
                ${
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear() &&
                  selectedDate !== formatDate(day)
                    ? "border border-indigo-400"
                    : ""
                }
              `}
              type="button"
            >
              {day}
            </button>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  )
}
