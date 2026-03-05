export interface DonationRecord {
  id: string;
  campaignId: string | 'general';
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  method: string;
  externalProvider?: string;
  status: 'completed' | 'pending';
  createdAt: string;
}

export interface VolunteerApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  interests: string[];
  skills: string;
  availability: string;
  status: 'received' | 'under_review';
  createdAt: string;
}

// In-memory stores
const donations: DonationRecord[] = [];
const volunteerApplications: VolunteerApplication[] = [];

export const mockStore = {
  donations: {
    add: (record: Omit<DonationRecord, 'id' | 'createdAt'>) => {
      const newRecord: DonationRecord = {
        ...record,
        id: `don-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      donations.push(newRecord);
      return newRecord;
    },
    get: (id: string) => donations.find(d => d.id === id)
  },
  volunteerApplications: {
    add: (record: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>) => {
      const newRecord: VolunteerApplication = {
        ...record,
        id: `vol-app-${Math.random().toString(36).substr(2, 9)}`,
        status: 'received',
        createdAt: new Date().toISOString()
      };
      volunteerApplications.push(newRecord);
      return newRecord;
    }
  }
};
