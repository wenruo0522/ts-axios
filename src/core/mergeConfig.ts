import { AxiosRequestConfig } from '../types'

const strategys = Object.create(null)


function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const strategyKeysFromVal2 = ["url", "params", "data"]

strategyKeysFromVal2.forEach(key => {
  strategys[key] = fromVal2Strategy
})


function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategys[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}

export default mergeConfig
