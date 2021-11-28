const Config = {
  network: {
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
    apiPath: process.env.REACT_APP_API_PATH || '/api/v1/',
    apiUrl: process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_API_PATH,
  }
}

Config.network.apiUrl = process.env.REACT_APP_API_URL || Config.network.backendUrl + Config.network.apiPath

export default Config
