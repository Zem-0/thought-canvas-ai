
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Note } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { summarizeText } from '@/lib/ai';
import { useAuth } from '@/hooks/useAuth';

export function useNotes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchNotes = async (): Promise<Note[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  };

  const getNoteById = async (id: string): Promise<Note | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const createNote = async ({ title, content, color }: { title: string; content: string; color?: string }): Promise<Note> => {
    if (!user) throw new Error('User not authenticated');

    const newNote = {
      title,
      content,
      color: color || '#9b87f5',
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from('notes')
      .insert([newNote])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const updateNote = async ({ id, title, content, color }: { id: string; title?: string; content?: string; color?: string }): Promise<Note> => {
    if (!user) throw new Error('User not authenticated');

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (color !== undefined) updates.color = color;

    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const deleteNote = async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }
  };

  const generateSummary = async (id: string): Promise<Note> => {
    if (!user) throw new Error('User not authenticated');

    // First get the note
    const { data: note, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !note) {
      throw fetchError || new Error('Note not found');
    }

    // Generate summary using AI
    const summary = await summarizeText(note.content);

    // Update note with summary
    const { data, error: updateError } = await supabase
      .from('notes')
      .update({ summary })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return data;
  };

  // Use React Query for data fetching
  const notesQuery = useQuery({
    queryKey: ['notes', user?.id],
    queryFn: fetchNotes,
    enabled: !!user,
  });

  const getNoteQuery = (id: string) => {
    return useQuery({
      queryKey: ['note', id],
      queryFn: () => getNoteById(id),
      enabled: !!user && !!id,
    });
  };

  // Mutations
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      toast({
        title: 'Note created',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to create note',
        description: (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['note', data.id] });
      toast({
        title: 'Note updated',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update note',
        description: (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      toast({
        title: 'Note deleted',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete note',
        description: (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  const summarizeNoteMutation = useMutation({
    mutationFn: generateSummary,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['note', data.id] });
      toast({
        title: 'Summary generated',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to generate summary',
        description: (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    error: notesQuery.error,
    getNoteQuery,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    summarizeNote: summarizeNoteMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    isSummarizing: summarizeNoteMutation.isPending,
  };
}
