export function month(item) {
    return {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sept",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }[item];
}

export function hours(item) {
    if (Number(item) <= 12) {
        return `${item}am`;
    }
    return `${Number(item) - 12}pm`;
}
