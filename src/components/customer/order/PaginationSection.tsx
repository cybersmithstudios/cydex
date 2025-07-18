
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationSectionProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const PaginationSection: React.FC<PaginationSectionProps> = ({
  totalPages,
  currentPage,
  setCurrentPage
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4 p-2">
      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        className="h-7 px-2 text-xs"
      >
        ←
      </Button>
      
      <div className="flex items-center gap-1">
        {/* Show page numbers for small screens */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          if (totalPages <= 5) {
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0 text-xs"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          }
          return null;
        })}
        
        {totalPages > 5 && (
          <span className="text-xs text-gray-500 px-2">
            {currentPage} of {totalPages}
          </span>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        className="h-7 px-2 text-xs"
      >
        →
      </Button>
    </div>
  );
};
