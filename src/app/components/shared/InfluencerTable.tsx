// components/shared/InfluencerTable.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Influencer {
  id: string;
  name: string;
  platform: string;
  followers: number;
  confidenceScore: number;
  verifiedClaims: number;
  totalClaims: number;
}

interface InfluencerTableProps {
  data: Influencer[];
  loading: boolean;
}

export function InfluencerTable({ data, loading }: InfluencerTableProps) {
  const [sortField, setSortField] = useState<keyof Influencer>('confidenceScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSort = (field: keyof Influencer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Influencers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Name
            </TableHead>
            <TableHead onClick={() => handleSort('platform')} className="cursor-pointer">
              Platform
            </TableHead>
            <TableHead onClick={() => handleSort('followers')} className="cursor-pointer">
              Followers
            </TableHead>
            <TableHead onClick={() => handleSort('confidenceScore')} className="cursor-pointer">
              Confidence Score
            </TableHead>
            <TableHead onClick={() => handleSort('verifiedClaims')} className="cursor-pointer">
              Verified Claims
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((influencer) => (
            <TableRow key={influencer.id}>
              <TableCell>{influencer.name}</TableCell>
              <TableCell>{influencer.platform}</TableCell>
              <TableCell>{influencer.followers.toLocaleString()}</TableCell>
              <TableCell>{influencer.confidenceScore.toFixed(2)}</TableCell>
              <TableCell>
                {influencer.verifiedClaims}/{influencer.totalClaims}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
