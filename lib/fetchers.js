const fetchers = {
  GET: async (...args) => {
    const res = await fetch(...args)
    if(!res.ok){
      throw new Error(await res.text())
    }
    return res.json()
  },
  POST: async (route, body) => {
    const res = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if(!res.ok){
      throw new Error(await res.text())
    }
    return res.json()
  }
}

export default fetchers;
