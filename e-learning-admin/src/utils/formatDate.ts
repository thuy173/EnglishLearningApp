import { format } from 'date-fns';

export function fDate(date: Date, newFormat?: string) {
    const fm = newFormat || 'dd/MM/yyyy';

    return date ? format(new Date(date), fm) : '';
}

export function fDateInVietnamese(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `Ngày ${day} tháng ${month} năm ${year}`;
}

export function fDateFromString(dateStr: string, newFormat?: string) {
    const fm = newFormat || 'dd/MM/yyyy';
    const date = dateStr ? new Date(dateStr) : ''

    return date ? format(new Date(date), fm) : '';
}

export const fDateToString = (date: Date | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Helper function to parse local datetime string to Date
export const parseStringToDate = (dateString: string): Date | undefined => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
};