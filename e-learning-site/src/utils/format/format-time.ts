import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date: Date, newFormat?: string) {
  const fm = newFormat || "dd/MM/yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateInVietnamese(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Ngày ${day} tháng ${month} năm ${year}`;
}

export function fDateFromString(dateStr: string, newFormat?: string) {
  const fm = newFormat || "dd/MM/yyyy";
  const date = dateStr ? new Date(dateStr) : "";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(
  date: string | number | Date,
  newFormat?: string
): string {
  const fm = newFormat || "dd MMM yyyy p";
  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: string | number | Date): string | number {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: string | number | Date): string {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export function formatTimeLimit(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} phút`;
}
