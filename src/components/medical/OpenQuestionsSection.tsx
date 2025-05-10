
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
          {onChange && (
            <div className="flex items-center gap-2 bg-gray-100 p-1.5 px-3 rounded-full shadow-sm">
              <Pencil className="h-4 w-4 text-gray-600" />
              <Label htmlFor="edit-questions" className="text-xs font-medium text-gray-700">Edit</Label>
              <Switch 
                id="edit-questions"
                checked={isEditing} 
                onCheckedChange={setIsEditing}
                aria-label="Toggle edit mode"
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          )}
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
