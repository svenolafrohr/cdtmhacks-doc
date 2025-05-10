
import React, { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

interface EditableSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, children, className = '' }) => {
  return (
    <Card className={`mb-4 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default EditableSection;
