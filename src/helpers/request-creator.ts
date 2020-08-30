namespace NRequest {
  export interface ICreator {
    host: string
    url: string //part after host
    method: methods
    headers?: HeadersInit
    data?: any //if method 'get', it transform to searchParams in url, else - add to 'body' of request
  }

  export enum methods {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE',
  }
}

export async function requestCreator<T>(settings: NRequest.ICreator) {
  let url = `${settings.host}/${settings.url}`
  let body

  if (!Object.values(requestCreator.methods).includes(settings.method))
    throw new Error(`${settings.method} is unknown method`)

  switch (settings.method) {
    case requestCreator.methods.get: {
      if (settings.data) {
        const searhParameters = getSearchParameters({ params: settings.data })
        url += `?${searhParameters}`
      }
      break
    }

    case requestCreator.methods.post:
    case requestCreator.methods.put: {
      body = JSON.stringify(settings.data)
      break
    }

    default:
      break
  }

  const headers = new Headers({
    Accept: 'application/json',
    ...settings.headers,
  })

  const response = await fetch(url, {
    method: settings.method,
    headers,
    body,
  })

  if (!response.ok) throw new Error(String(response.status))

  return (await response.json()) as Promise<T>
}

requestCreator.methods = NRequest.methods

function getSearchParameters({ params }: { params: any }) {
  return Object.keys(params).reduce((accumulator, parameterKey) => {
    const parameterValue = params[parameterKey]
    if (parameterValue) {
      accumulator.append(parameterKey, parameterValue)
    }
    return accumulator
  }, new URLSearchParams())
}
