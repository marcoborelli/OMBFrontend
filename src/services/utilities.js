export function getLastOpeningIndex(data) {
    let i = 0
    let lastAngle = -1

    for (i = 0; i < data.length; i++) {
        if (data[i].angle <= lastAngle) {
            break
        }

        lastAngle = data[i].angle
    }

    return i
}