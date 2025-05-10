
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface OpenQuestionsProps {
  openQuestions: Array<{
    question_id: string;
    questions: string;
  }>;
}

const OpenQuestionsSection: React.FC<OpenQuestionsProps> = ({ openQuestions }) => {
  if (!openQuestions || openQuestions.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Open Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {openQuestions.map((item, index) => (
            <div 
              key={item.question_id} 
              className="p-3 bg-amber-50 border border-amber-100 rounded-md"
            >
              <p className="text-amber-800">{item.questions}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenQuestionsSection;
