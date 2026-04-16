import InvitationExperience from "@/components/InvitationExperience";
import AudioPlayer from "@/components/features/AudioPlayer";
import weddingData from "@/util/data/wedding-data.json";

export async function generateMetadata() {
  return {
    title: `${weddingData.couple.groom.name} & ${weddingData.couple.bride.name} ${weddingData.eventType || 'Wedding'}`,
    description: weddingData.messages.inviteText,
    openGraph: {
      type: 'website',
      url: weddingData.websiteUrl,
      title: `${weddingData.couple.groom.name} & ${weddingData.couple.bride.name} ${weddingData.eventType || 'Wedding'}`,
      description: weddingData.messages.inviteText,
      images: [
        {
          url: '/assets/images/social-share.png',
          width: 1200,
          height: 630,
          alt: `${weddingData.eventType || 'Wedding'} Invitation map snippet`
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${weddingData.couple.groom.name} & ${weddingData.couple.bride.name} ${weddingData.eventType || 'Wedding'} Invitation`,
      description: weddingData.messages.inviteText,
      images: ['/assets/images/social-share.png'],
    },
    icons: {
      icon: '/assets/favicon.png',
      apple: '/assets/apple-touch-icon.png',
    }
  };
}

export const viewport = {
  themeColor: '#6B0D1E',
};

export default function Home() {
  return (
    <main className="w-full h-full overflow-hidden bg-black relative">
      <InvitationExperience weddingData={weddingData} />
      <AudioPlayer musicUrl="/assets/music/music.mp3" autoplay={true} />
    </main>
  );
}
