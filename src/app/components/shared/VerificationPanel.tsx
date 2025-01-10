// components/shared/VerificationPanel.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export function VerificationPanel() {
  const [claim, setClaim] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!claim.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim }),
      });

      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      console.error('Error verifying claim:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Claim Verification</h2>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Enter a health claim to verify..."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className="min-h-[100px]"
        />
        
        <Button
          onClick={handleVerification}
          disabled={loading || !claim.trim()}
          className="w-full"
        >
          {loading ? 'Verifying...' : 'Verify Claim'}
        </Button>
      </div>

      {verificationResult && (
        <Card className="p-4 mt-4">
          <h3 className="font-semibold mb-2">Verification Result:</h3>
          <div className="space-y-2">
            <p>Status: {verificationResult.status}</p>
            <p>Confidence: {verificationResult.confidence}%</p>
            <p>Sources: {verificationResult.sources?.length || 0}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
