import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { generateSummary } from '@/lib/gemini';
import { toast } from 'sonner';

interface SummaryButtonProps {
  text: string;
  onSummaryGenerated: (summary: string) => void;
}

export function SummaryButton({ text, onSummaryGenerated }: SummaryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = async () => {
    if (!text.trim()) {
      toast.error('Please add some text to summarize');
      return;
    }

    setIsLoading(true);
    try {
      const summary = await generateSummary(text);
      onSummaryGenerated(summary);
      toast.success('Summary generated successfully');
    } catch (error) {
      toast.error('Failed to generate summary');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGenerateSummary}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Summary'
      )}
    </Button>
  );
} 