
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <CardTitle className="text-lg font-semibold">Open Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {openQuestions && openQuestions.length > 0 ? (
          <div className="space-y-2">
            {openQuestions.map((item) => (
              <div 
                key={item.question_id} 
                className="p-3 bg-amber-50 border border-amber-100 rounded-md flex justify-between items-center"
              >
                <p className="text-amber-800">{item.questions}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
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
