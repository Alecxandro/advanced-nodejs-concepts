function minLength(length: number) {
  return (target: any, key: string) => {
    let value = target[key];

    const getter = () => value;
    const setter = (arr: string) => {
      if (arr.length < length) {
        console.log(`Error: You can't create ${key} with a size less than ${length}`)
        return
      }
      value = arr
    }

    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    })
  }
}

class Movie {
  @minLength(10)
  title: string

  constructor(t: string){
    this.title = t
  }
}

const movie = new Movie('Citizen')
console.log(movie)