
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface OpenQuestionsProps {
  openQuestions: Array<{
    question_id: string;
    questions: string;
  }>;
  colorScheme?: {
    bg: string;
    border: string;
    text: string;
    highlight: string;
    highlightText: string;
  };
}

const OpenQuestionsSection: React.FC<OpenQuestionsProps> = ({ openQuestions, colorScheme }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Open Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {openQuestions && openQuestions.length > 0 ? (
          <div className="space-y-3">
            {openQuestions.map((question, index) => (
              <div 
                key={question.question_id || index} 
                className={`p-3 rounded ${colorScheme ? colorScheme.highlight : 'bg-yellow-50'}`}
              >
                <div className="flex justify-between items-start">
                  <p className={`${colorScheme ? colorScheme.highlightText : 'text-yellow-800'} flex-1`}>
                    {question.questions}
                  </p>
                  <div className="flex space-x-2 ml-4">
                    <button className={`p-1 rounded hover:${colorScheme ? colorScheme.bg : 'bg-yellow-100'}`}>
                      <CheckCircle className={`h-4 w-4 ${colorScheme ? colorScheme.text : 'text-green-600'}`} />
                    </button>
                    <button className={`p-1 rounded hover:${colorScheme ? colorScheme.bg : 'bg-yellow-100'}`}>
                      <XCircle className={`h-4 w-4 ${colorScheme ? colorScheme.text : 'text-red-600'}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center text-gray-500">No open questions recorded</div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpenQuestionsSection;
