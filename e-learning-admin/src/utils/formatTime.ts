export const fTimeLimit = (timeLimit: number) => {
    if (isNaN(timeLimit) || timeLimit < 0) {
        return 'Invalid time';
    }

    // If less than 60 minutes, return in minutes
    if (timeLimit < 60) {
        return `${timeLimit}min`;
    }

    // Calculate hours and remaining minutes
    const hours = Math.floor(timeLimit / 60);
    const remainingMinutes = timeLimit % 60;

    // Format with hours and optional minutes
    if (remainingMinutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
};
