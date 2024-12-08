import { toast } from "sonner";

export const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof Error) {
        toast.error(defaultMessage, { description: error.message });
    } else {
        toast.error(defaultMessage, { description: 'Undefined error' });
    }
};
