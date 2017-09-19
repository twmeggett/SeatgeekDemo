export default function removeTimeZoneFromISO(date) {
    const n = date.toISOString();
    return n.slice(0, n.indexOf('.'));
}
