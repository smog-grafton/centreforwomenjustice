import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { VolunteerOpportunity } from '@/data/volunteerOpportunities';
import { Button } from '@/components/ui/Common';
import Link from 'next/link';

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="space-y-4 flex-grow">
        <div className="flex justify-between items-start">
          <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {opportunity.category}
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-slate-900">{opportunity.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{opportunity.description}</p>
        
        <div className="space-y-2 pt-4">
          <div className="flex items-center text-xs text-slate-500 font-medium">
            <MapPin className="h-4 w-4 mr-2 text-secondary" />
            {opportunity.location}
          </div>
          <div className="flex items-center text-xs text-slate-500 font-medium">
            <Clock className="h-4 w-4 mr-2 text-secondary" />
            {opportunity.commitment}
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requirements</h4>
          <ul className="space-y-2">
            {opportunity.requirements.map((req, i) => (
              <li key={i} className="flex items-start text-xs text-slate-600">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/30 mr-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 mt-auto">
        <Link href={`/volunteer/apply?role=${opportunity.id}`}>
          <Button variant="outline" className="w-full">
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
