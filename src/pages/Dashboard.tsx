
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNotes } from '@/hooks/useNotes';
import Layout from '@/components/Layout';
import NoteCard from '@/components/NoteCard';
import { Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes, isLoading, isError } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes based on search query
  const filteredNotes = searchQuery 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return (
    <Layout>
      <div className="container py-8 bg-dark-purple min-h-screen text-white">
        {/* Dashboard header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-accent bg-clip-text text-transparent">
              Your Notes
            </h1>
            <p className="text-muted-foreground mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} available
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={() => navigate('/dashboard/new')} 
              className="whitespace-nowrap bg-dark-accent hover:bg-dark-accent/90"
            >
              <Plus className="h-4 w-4 mr-2" /> New Note
            </Button>
          </div>
        </div>
        
        {/* Notes grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white/70">Loading notes...</div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">Error loading notes. Please try again.</div>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12 bg-white/5 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-medium">No notes match your search</h2>
            <p className="text-muted-foreground mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-medium">You don't have any notes yet</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Create your first note to get started
            </p>
            <Button onClick={() => navigate('/dashboard/new')} className="bg-dark-accent hover:bg-dark-accent/90">
              <Plus className="h-4 w-4 mr-2" /> Create Your First Note
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
