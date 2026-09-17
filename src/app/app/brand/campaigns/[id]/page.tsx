import { redirect } from "next/navigation";

export default function BrandCampaignRedirectPage({ params }: { params: { id: string } }) {
  redirect(`/campaigns/${params.id}`);
}
