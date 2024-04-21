import PageError404 from '../pages/PageError404'

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

export function getErrorPage(error) {
    switch (error) {
        case 404:
            return PageError404()
        case 500:
            //TODO
            break
    }
}