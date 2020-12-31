export const strPad = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
};

export const secondsToClock = seconds => {
    return `${strPad(Math.floor(seconds / 60), "0", 2)}:${strPad(
        seconds % 60,
        "0",
        2
    )}`;
};
