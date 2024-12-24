import { describe, it, expect } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';
import { advocateData } from '../../../db/seed/advocates';

describe('GET /api/route', () => {
  it('returns all advocates when no searchTerm is provided', async () => {
    const mockUrl = new URL('http://localhost:3000/api/route');
    const mockRequest = {
      nextUrl: mockUrl,
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toEqual(advocateData);
  });

  it('returns filtered advocates when a searchTerm is provided', async () => {
    const searchTerm = 'therapist';
    const mockUrl = new URL(`http://localhost:3000/api/route?searchTerm=${searchTerm}`);
    const mockRequest = {
      nextUrl: mockUrl,
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const data = await response.json();

    const expectedData = advocateData.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm)
      );
    });

    expect(response.status).toBe(200);
    expect(data.data).toEqual(expectedData);
  });

  it('returns an empty array if no advocates match the searchTerm', async () => {
    const searchTerm = 'NonExistentTerm';
    const mockUrl = new URL(`http://localhost:3000/api/route?searchTerm=${searchTerm}`);
    const mockRequest = {
      nextUrl: mockUrl,
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toEqual([]);
  });
});
