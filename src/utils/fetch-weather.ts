import axios, { AxiosError } from 'axios';
import { APIError } from './api-error';

export interface OpenWeatherGeoResponse {
  lat: number;
  lon: number;
  name: string;
}

export interface WeatherData {
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  humidity: number;
}

export interface OpenWeatherResponse {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}

export async function fetchWeather(cityName: string): Promise<WeatherData> {
  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!OPENWEATHER_API_KEY) {
    throw new APIError('OpenWeather API key is not configured');
  }

  try {
    const geoResponse = await axios.get<OpenWeatherGeoResponse[]>(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: cityName,
        limit: 1,
        appid: OPENWEATHER_API_KEY,
      },
    });

    if (!geoResponse.data.length) {
      throw new APIError('Location not found', 404);
    }

    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get<OpenWeatherResponse>(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    return {
      temperature: {
        current: weatherResponse.data.main.temp,
        min: weatherResponse.data.main.temp_min,
        max: weatherResponse.data.main.temp_max,
      },
      humidity: weatherResponse.data.main.humidity,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new APIError('Failed to fetch weather data', error.response?.status, error.code);
    }
    throw error;
  }
}
