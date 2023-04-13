export function formatDateToString(date: Date): string {
    const dateTime = date.getTime()
    const hour = Math.abs(Math.floor(dateTime / (1000 * 60 * 60)))
    const minutes  = Math.abs(Math.floor((dateTime / (1000 * 60)) % 60))
    const seconds = Math.abs(Math.floor((dateTime / 1000) % 60))
    return `PT${hour}H${minutes}M${seconds}S`
}
