
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AssessmentPlanProps {
  assessment: {
    summary: string;
  };
  plan: {
    plan: string;
    next_appointment: string;
  };
  onChange?: {
    assessment?: (field: string, value: any) => void;
    plan?: (field: string, value: any) => void;
  };
  editable?: boolean;
}

const AssessmentPlanSection: React.FC<AssessmentPlanProps> = ({ assessment, plan, onChange, editable = false }) => {
  const [isEditing, setIsEditing] = useState(editable);
  
  if (!assessment && !plan) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Assessment & Plan</CardTitle>
          {onChange && (
            <div className="flex items-center gap-2">
              <Label htmlFor="edit-assessment" className="text-xs">Edit</Label>
              <Switch 
                id="edit-assessment"
                checked={isEditing} 
                onCheckedChange={setIsEditing}
                aria-label="Toggle edit mode"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {assessment && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Assessment</h4>
            {isEditing && onChange?.assessment ? (
              <Textarea
                value={assessment.summary || ''}
                onChange={(e) => onChange.assessment && onChange.assessment('summary', e.target.value)}
                className="w-full"
                placeholder="Assessment summary"
                rows={4}
              />
            ) : (
              <p className="text-gray-900 whitespace-pre-line">{assessment.summary || ''}</p>
            )}
          </div>
        )}
        
        {plan && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Plan</h4>
            {isEditing && onChange?.plan ? (
              <>
                <Textarea
                  value={plan.plan || ''}
                  onChange={(e) => onChange.plan && onChange.plan('plan', e.target.value)}
                  className="w-full mb-3"
                  placeholder="Treatment plan"
                  rows={4}
                />
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Next Appointment</h4>
                  <Input
                    type="date"
                    value={plan.next_appointment || ''}
                    onChange={(e) => onChange.plan && onChange.plan('next_appointment', e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-900 whitespace-pre-line">{plan.plan}</p>
                
                {plan.next_appointment && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md">
                    <div className="text-sm font-medium text-blue-700">Next Appointment</div>
                    <div className="text-blue-900">
                      {formatDate(plan.next_appointment)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentPlanSection;
