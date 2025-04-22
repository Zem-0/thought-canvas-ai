
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/lib/supabase';
import { Save, ArrowRight } from 'lucide-react';

interface NoteEditorProps {
  noteId?: string;
}

const NoteEditor = ({ noteId }: NoteEditorProps) => {
  const navigate = useNavigate();
  const { getNoteQuery, createNote, updateNote, isCreating, isUpdating } = useNotes();
  const { data: existingNote, isLoading } = getNoteQuery(noteId || '');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#9b87f5');
  
  const colorOptions = [
    { value: '#9b87f5', label: 'Purple' },
    { value: '#D3E4FD', label: 'Blue' },
    { value: '#F2FCE2', label: 'Green' },
    { value: '#FEF7CD', label: 'Yellow' },
    { value: '#FEC6A1', label: 'Orange' },
    { value: '#FFDEE2', label: 'Pink' },
  ];

  // Load existing note data if editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setColor(existingNote.color || '#9b87f5');
    }
  }, [existingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    if (noteId && existingNote) {
      // Update existing note
      updateNote({
        id: noteId,
        title,
        content,
        color,
      });
    } else {
      // Create new note
      createNote({
        title,
        content,
        color,
      });
    }
    
    navigate('/dashboard');
  };

  const isPending = isCreating || isUpdating;

  if (noteId && isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Title input */}
          <div className="flex-grow">
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="text-lg font-medium"
              required
            />
          </div>
          
          {/* Color selector */}
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((colorOpt) => (
                <SelectItem 
                  key={colorOpt.value} 
                  value={colorOpt.value}
                  className="flex items-center gap-2"
                >
                  <span 
                    className="inline-block w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colorOpt.value }} 
                  />
                  {colorOpt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Content editor */}
        <div className="note-container">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note..."
            className="min-h-[300px] focus-visible:ring-1"
            required
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isPending}
            className="gap-1"
          >
            {isPending ? (
              <>Saving...</>
            ) : noteId ? (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4" /> Create Note
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
