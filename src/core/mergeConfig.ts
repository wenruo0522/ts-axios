import { AxiosRequestConfig } from '../types'


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
  strategy[key] = fromVal2Strategy
})


function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config1) {
    mergeField(key)
  }

  function mergeField(key: string): void {
    const strategy = strategys[key] || defaultStrategy
    config[key] = strategy()
  }

  return config
}

export default mergeConfig
