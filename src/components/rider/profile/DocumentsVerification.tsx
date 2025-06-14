
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
  if (!documents) return null;

  const documentsList = [
    {
      icon: Shield,
      name: 'National ID',
      expiry: documents.idCard.expiryDate,
      verified: documents.idCard.verified
    },
    {
      icon: Car,
      name: 'Driver\'s License',
      expiry: documents.driverLicense.expiryDate,
      verified: documents.driverLicense.verified
    },
    {
      icon: FileText,
      name: 'Insurance',
      expiry: documents.insurance.expiryDate,
      verified: documents.insurance.verified
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {documentsList.map((doc, index) => {
            const IconComponent = doc.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">Exp: {doc.expiry}</p>
                  </div>
                </div>
                <Badge className={`${doc.verified ? 'bg-green-500' : 'bg-yellow-500'} flex items-center gap-1 text-xs`}>
                  {doc.verified && <Check className="h-3 w-3" />}
                  {doc.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            );
          })}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9"
          onClick={onUpdateDocuments}
        >
          Update Documents
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentsVerification;
