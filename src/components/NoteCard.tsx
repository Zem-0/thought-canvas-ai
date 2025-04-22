
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Note } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Sparkles, Edit, Trash2 } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { deleteNote, summarizeNote, isSummarizing } = useNotes();
  const [showSummary, setShowSummary] = useState(false);
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Generate a brief preview of the content
  const contentPreview = (content: string) => {
    const textOnly = content.replace(/<[^>]+>/g, '');
    return textOnly.length > 100 ? `${textOnly.substring(0, 100)}...` : textOnly;
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };

  const handleSummarize = () => {
    summarizeNote(note.id);
    setShowSummary(true);
  };

  const displayText = showSummary && note.summary ? note.summary : contentPreview(note.content);

  return (
    <Card className={cn(
      "h-full overflow-hidden transition-all duration-200 hover:shadow-md bg-white/5 backdrop-blur-sm border-white/10",
      note.color ? `border-l-4 border-l-[${note.color}]` : "border-l-4 border-l-dark-accent"
    )}>
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-medium text-lg truncate text-white">{note.title}</h3>
            <p className="text-xs text-white/50 mt-1">
              {formatDate(note.updated_at)}
            </p>
          </div>
          
          <div className="px-6 py-4 flex-grow">
            <p className="text-sm line-clamp-3 text-white/80">{displayText}</p>
          </div>
          
          <div className="px-6 py-3 bg-black/20 flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs flex items-center gap-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isSummarizing}
              onClick={handleSummarize}
            >
              <Sparkles className="h-3 w-3" />
              {isSummarizing ? 'Processing...' : 'Summarize'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/10">
                <Link to={`/dashboard/edit/${note.id}`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-dark-purple border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this note? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5 text-white hover:bg-white/10">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
