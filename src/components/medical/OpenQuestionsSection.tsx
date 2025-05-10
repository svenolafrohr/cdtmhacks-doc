
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Pencil } from 'lucide-react';

interface OpenQuestionsProps {
  openQuestions: Array<{
    question_id: string;
    questions: string;
  }>;
  onChange?: (index: number, field: string, value: any) => void;
  editable?: boolean;
}

const OpenQuestionsSection: React.FC<OpenQuestionsProps> = ({ openQuestions, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!openQuestions || openQuestions.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Open Questions</CardTitle>
          <Toggle 
            className="h-8 w-8 p-0 rounded-full" 
            pressed={isEditing} 
            onPressedChange={setIsEditing}
            aria-label="Toggle edit mode"
          >
            <Pencil className="h-4 w-4" />
          </Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {openQuestions.map((item, index) => (
            <div 
              key={item.question_id} 
              className="p-3 bg-amber-50 border border-amber-100 rounded-md"
            >
              {isEditing && onChange ? (
                <Textarea
                  value={item.questions}
                  onChange={(e) => onChange(index, 'questions', e.target.value)}
                  className="w-full bg-transparent border-0 focus-visible:ring-0 p-0"
                />
              ) : (
                <p className="text-amber-800">{item.questions}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenQuestionsSection;
