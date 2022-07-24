function getLocalTimestampString(date: Date): string {
    const offsetMilliseconds = date.getTimezoneOffset() * 60000;

    const localTime = date.getTime() - offsetMilliseconds;

    const localTimestamp = new Date(localTime);

    const month = localTimestamp.getMonth() + 1;

    const maxLength = 2;

    const fillString = "0";

    const monthString = String(month).padStart(maxLength, fillString);

    const day = localTimestamp.getDate();

    const dayString = String(day).padStart(maxLength, fillString);

    const year = localTimestamp.getFullYear();

    const yearMaxLength = 4;

    const yearString = String(year).padStart(yearMaxLength, fillString);

    const hours = localTimestamp.getHours();

    const amPm = (hours < 12) ? "AM" : "PM";

    const amPmHours = (hours <= 12) ? hours : (hours - 12);

    const hoursString = String(amPmHours).padStart(maxLength, fillString);

    const minutes = localTimestamp.getMinutes();

    const minutesString = String(minutes).padStart(maxLength, fillString);

    return `${monthString}/${dayString}/${yearString} ${hoursString}:${minutesString} ${amPm}`;
} //getDateString

export default getLocalTimestampString;