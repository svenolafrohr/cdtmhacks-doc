
import React, { useState } from 'react';
import { 
  patient, 
  visits, 
  vitals, 
  diagnoses, 
  medicalHistory, 
  medications,
  vitalsHistory
} from '@/data/mockData';

// Components
import { Search, Paperclip, ChevronDown, X, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const PatientDashboard = () => {
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );
  
  const [selectedVisitId, setSelectedVisitId] = useState(sortedVisits[0]?.id || '');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-teal-800">GKV</h1>
      </div>
      
      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center border rounded-lg bg-white relative">
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <Input 
            className="pl-10 pr-10 py-6 border-0 focus-visible:ring-0" 
            placeholder="Vorlage suchen"
          />
          <ChevronDown className="absolute right-3 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      {/* Medical categories */}
      <div className="space-y-4 mt-6">
        {/* Anamnese */}
        <CategorySection 
          letter="A" 
          bgColor="bg-amber-100" 
          textColor="text-amber-800"
          title="Anamnese"
          content="This is a string"
        >
          {/* Empty children prop to satisfy TypeScript */}
          <></>
        </CategorySection>
        
        {/* Befund */}
        <CategorySection 
          letter="B" 
          bgColor="bg-amber-100" 
          textColor="text-amber-800"
          title="Befund"
          content="Also a string. (with attachments)"
          hasAttachment={true}
        >
          {/* Empty children prop to satisfy TypeScript */}
          <></>
        </CategorySection>
        
        {/* Procedere */}
        <CategorySection 
          letter="P" 
          bgColor="bg-blue-100" 
          textColor="text-blue-800"
          title="Procedere"
          content="Another string"
        >
          {/* Empty children prop to satisfy TypeScript */}
          <></>
        </CategorySection>
        
        {/* Folgetermin */}
        <CategorySection 
          letter="F" 
          bgColor="bg-teal-100" 
          textColor="text-teal-800"
          title="Folgetermin"
          content=""
          expandable={true}
        >
          <div className="bg-amber-50 text-gray-800 py-1 px-3 rounded-md inline-flex items-center mr-2 mb-2">
            Erkältung
            <X className="ml-2 h-4 w-4 text-gray-500" />
          </div>
        </CategorySection>
        
        {/* New entry button */}
        <button className="flex items-center text-gray-500 mt-4 hover:text-gray-700">
          <span className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full mr-2">+</span>
          Neuen Eintrag einfügen
        </button>
        
        {/* Diagnosen */}
        <CategorySection 
          letter="D" 
          bgColor="bg-orange-100" 
          textColor="text-orange-800"
          title="Diagnosen"
          content=""
          expandable={true}
        >
          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10 py-2 bg-white" 
                placeholder="Diagnose suchen"
              />
            </div>
            
            <div className="mt-3 border-l-4 border-amber-300 pl-3 py-1 mb-3">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">J30.1</span> Allergische Rhinopathie durch Pollen
                </div>
                <div className="flex items-center">
                  <span className="text-green-700 font-bold mr-2">DD</span>
                  <span className="text-gray-500 mr-2">Gesichert</span>
                  <X className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-amber-300 pl-3 py-1">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">J06.9</span> Akute Infektion der oberen Atemwege, nicht näh...
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Gesichert</span>
                  <X className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </CategorySection>
        
        {/* Leistung */}
        <CategorySection 
          letter="L" 
          bgColor="bg-purple-100" 
          textColor="text-purple-800"
          title="Leistung"
          content=""
          expandable={true}
        >
          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10 py-2 bg-white" 
                placeholder="Leistung suchen"
              />
            </div>
            
            <div className="mt-3 border-l-4 border-purple-200 pl-3 py-1">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">03000</span> Versichertenpauschale
                </div>
                <X className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </CategorySection>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white border-t">
        <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center">
          <Mic className="text-white" />
        </div>
        
        <Button className="px-10 py-6 bg-white border border-teal-700 text-teal-700 hover:bg-teal-50">
          Speichern
        </Button>
      </div>
    </div>
  );
};

// Component for each category section
const CategorySection = ({ 
  letter, 
  bgColor, 
  textColor, 
  title, 
  content, 
  hasAttachment = false,
  expandable = false,
  children 
}) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="flex">
        {/* Letter indicator */}
        <div className={`w-10 h-10 flex items-center justify-center text-lg font-bold ${bgColor} ${textColor}`}>
          {letter}
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">{title}</h2>
            {expandable && (
              <button onClick={() => setExpanded(!expanded)}>
                <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          
          {content && (
            <div className="flex justify-between mt-1">
              <p className="text-gray-600">{content}</p>
              {hasAttachment && <Paperclip className="h-5 w-5 text-gray-500" />}
            </div>
          )}
          
          {expanded && children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
