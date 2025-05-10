
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SquarePen } from 'lucide-react';

interface OpenQuestionsProps {
  openQuestions: Array<{
    question_id: string;
    questions: string;
  }>;
}

const OpenQuestionsSection: React.FC<OpenQuestionsProps> = ({ openQuestions }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <SquarePen className="h-5 w-5 mr-2 text-amber-500" />
          <CardTitle className="text-lg font-semibold">Open Questions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {openQuestions && openQuestions.length > 0 ? (
          <div className="space-y-2">
            {openQuestions.map((item) => (
              <div 
                key={item.question_id} 
                className="p-3 bg-amber-50 border border-amber-100 rounded-md"
              >
                <p className="text-amber-800">{item.questions}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No open questions</div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpenQuestionsSection;
