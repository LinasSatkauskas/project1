function getFullUrl(endpoint: string) {
    return `api/${endpoint}`
}


function getHeaders(header = {}) {
    return {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            ...header,
        },
    }
}

export async function getApi<T>(endpoint: string):Promise<T|undefined> {
    const fullurl = getFullUrl(endpoint)

    try {
        const result = await fetch(fullurl, getHeaders())
        return await result.json()
    }
        catch(e: any) {
            console.error(e.message)
            return
        }
    }

    export async function postApi(
        endpoint: string,
        data: Record<string, any>,
        methodType = '',
    ) {
    const fullurl = getFullUrl(endpoint)

    let response
    let error

    try {
        let _method = 'POST'

        switch (methodType) {
            case 'PUT':
                _method = 'PUT'
                break
            case 'DELETE':
                _method = 'DELETE'
                break
            case 'PATCH':
                _method = 'PATCH'
                break
            default:
                _method = 'POST'
                break
        }
        const postHeaders = {
            'Content-Type': 'application/json',

        }
        const result = await fetch(fullurl, {
            ...getHeaders(postHeaders),
            method: _method,
            body: JSON.stringify(data),
        })

        let response: any = null
        try {
            response = await result.json()
        } catch {
            response = null
        }
        if (!response) return
        return response
    } catch (e: any) {
        console.error(e.message)
    }
}

export async function putApi(
    endpoint: string,
    data: Record<string, any>,
) {
    return postApi(endpoint, data, 'PUT')
}
export async function deleteApi(
    endpoint: string,
    data: Record<string, any>,
) {
    return postApi(endpoint, data, 'DELETE')
}