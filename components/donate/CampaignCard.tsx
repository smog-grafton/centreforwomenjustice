import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CampaignApi } from '@/lib/donate-api';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/Common';

interface CampaignCardProps {
  campaign: CampaignApi;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const goal = Number(campaign.goal_amount) || 1;
  const raised = Number(campaign.raised_amount) || 0;
  const progress = Math.min(100, (raised / goal) * 100);
  const coverSrc = campaign.cover_image_url || campaign.cover_image || 'https://picsum.photos/seed/campaign/1200/800';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={coverSrc}
          alt={campaign.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
          {campaign.status}
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors">
            {campaign.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2">
            {campaign.short_description ?? ''}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
            <span className="text-primary">{formatCurrency(raised, campaign.currency)} raised</span>
            <span className="text-slate-400">Goal: {formatCurrency(goal, campaign.currency)}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium text-right">{Math.round(progress)}% of goal reached</p>
        </div>

        <div className="pt-4 mt-auto">
          <Link href={`/donate/campaigns/${campaign.slug}`}>
            <Button className="w-full">
              Support Campaign <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
