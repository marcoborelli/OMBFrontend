import PageError404 from '../pages/PageError404'

export function getErrorPage(error) {
    switch (error) {
        case 404:
            return PageError404()
        case 500:
            //TODO
            break
    }
}