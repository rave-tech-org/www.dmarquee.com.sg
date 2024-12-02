import { APIError } from '@/utils/api-error';
import { fetchWeather } from '@/utils/fetch-weather';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = new URL(request.url).searchParams;
  const areaName = searchParams.get('area');

  if (!areaName) {
    return NextResponse.json({ error: 'Area name is required' }, { status: 400 });
  }

  try {
    const weather = await fetchWeather(areaName);

    return NextResponse.json({ weather });
  } catch (error) {
    const apiError = error instanceof APIError ? error : new APIError('Internal server error');
    return NextResponse.json({ error: apiError.message }, { status: apiError.status || 500 });
  }
}
