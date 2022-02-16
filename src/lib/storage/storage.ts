class Storage {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key)
    if(data !== null) return JSON.parse(data)
    return data
  }
  set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

const storage = new Storage()

export {storage};
