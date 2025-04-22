
import { 
  Sparkles, 
  FileText, 
  ScrollText, 
  Clock, 
  Search
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: 'AI Summaries',
      description:
        'Get instant summaries of your lengthy notes to help you grasp the key points quickly.',
      icon: Sparkles,
      color: 'bg-note-purple/10 text-note-purple',
    },
    {
      name: 'Rich Text Editor',
      description:
        'Craft beautiful notes with our intuitive rich text editor. Format your content just the way you want.',
      icon: FileText,
      color: 'bg-note-blue/10 text-blue-700',
    },
    {
      name: 'Organize with Ease',
      description:
        'Keep your notes organized by color coding them for different projects or priorities.',
      icon: ScrollText,
      color: 'bg-note-green/10 text-green-700',
    },
    {
      name: 'Always Available',
      description:
        'Access your notes from anywhere, anytime. Your thoughts are always at your fingertips.',
      icon: Clock,
      color: 'bg-note-yellow/10 text-yellow-700',
    },
    {
      name: 'Powerful Search',
      description:
        'Find exactly what you\'re looking for with our fast and accurate search functionality.',
      icon: Search,
      color: 'bg-note-orange/10 text-orange-700',
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Productive note-taking</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for better thinking
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            ThoughtCanvas combines powerful features with beautiful simplicity to help you capture and develop your ideas.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className={`animate-fade-in ${index % 2 === 0 ? '' : 'lg:mt-8'}`} style={{ animationDelay: `${index * 100}ms` }}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className={`rounded-lg p-2 ${feature.color}`}>
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
