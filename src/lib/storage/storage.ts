class Storage<T> {
  private readonly prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  private getFullKey(key: T): string {
    return this.prefix + ':' + key
  }

  get<U>(key: T): U | null {
    const fullKey = this.getFullKey(key)
    const data = localStorage.getItem(fullKey)
    if(data !== null) return JSON.parse(data)
    return data
  }
  set(key: T, data: any) {
    const fullKey = this.getFullKey(key)
    localStorage.setItem(fullKey, JSON.stringify(data))
  }
}

const enum apiKey {
  'apiData'
}
type apiKeyType = keyof typeof apiKey
const storage = new Storage<apiKeyType>('api')

export {storage};
