
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, Car, Check } from 'lucide-react';

interface DocumentsVerificationProps {
  documents: any;
  onUpdateDocuments: () => void;
}

const DocumentsVerification = ({ documents, onUpdateDocuments }: DocumentsVerificationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Documents & Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="font-medium">National ID</p>
                <p className="text-xs text-gray-500">Expires: {documents.idCard.expiryDate}</p>
              </div>
            </div>
            <Badge className="bg-green-500 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Verified
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="font-medium">Driver's License</p>
                <p className="text-xs text-gray-500">Expires: {documents.driverLicense.expiryDate}</p>
              </div>
            </div>
            <Badge className="bg-green-500 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Verified
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="font-medium">Insurance</p>
                <p className="text-xs text-gray-500">Expires: {documents.insurance.expiryDate}</p>
              </div>
            </div>
            <Badge className="bg-green-500 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onUpdateDocuments}
        >
          Update Document Verification
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentsVerification;
