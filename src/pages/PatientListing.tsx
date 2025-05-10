
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Patient {
  id: string;
  patient_id: number;
  first_name: string | null;
  last_name: string | null;
  dob: string | null;
  created_at: string;
}

const PatientListing = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('patient_record')
          .select('id, patient_id, first_name, last_name, dob, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPatients(data || []);
      } catch (err: any) {
        console.error('Error fetching patients:', err);
        toast({
          title: "Error loading patients",
          description: err.message || "Failed to load patient records",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [toast]);

  const filteredPatients = patients.filter(patient => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const firstName = patient.first_name?.toLowerCase() || '';
    const lastName = patient.last_name?.toLowerCase() || '';
    const patientId = patient.patient_id.toString();
    
    return firstName.includes(searchLower) || 
           lastName.includes(searchLower) || 
           patientId.includes(searchLower);
  });

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="space-y-4 pb-20">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patienten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Patienten suchen..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Lade Patientendaten...</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Keine Patienten gefunden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Geburtsdatum</TableHead>
                    <TableHead>Zuletzt aktualisiert</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>{patient.patient_id}</TableCell>
                      <TableCell>
                        {patient.first_name || '-'} {patient.last_name || '-'}
                      </TableCell>
                      <TableCell>
                        {patient.dob ? new Date(patient.dob).toLocaleDateString('de-DE') : '-'}
                      </TableCell>
                      <TableCell>
                        {formatDate(patient.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePatientClick(patient.id)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientListing;
