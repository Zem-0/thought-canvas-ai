import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';

const Summaries = () => {
  const { notes, isLoading } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes that have summaries
  const notesWithSummaries = notes.filter(note => note.summary);

  // Filter based on search query
  const filteredNotes = notesWithSummaries.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <Layout>
      <div className="container py-8 bg-dark-purple min-h-screen text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-accent bg-clip-text text-transparent">
              Your Summaries
            </h1>
            <p className="text-muted-foreground mt-1">
              {notesWithSummaries.length} {notesWithSummaries.length === 1 ? 'summary' : 'summaries'} available
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search summaries..."
              className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white/70">Loading summaries...</div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-medium">
              {searchQuery ? 'No summaries match your search' : 'No summaries available'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {searchQuery ? 'Try a different search term' : 'Generate summaries for your notes to see them here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className={cn(
                "overflow-hidden transition-all duration-200 hover:shadow-md bg-white/5 backdrop-blur-sm border-white/10",
                note.color ? `border-l-4 border-l-[${note.color}]` : "border-l-4 border-l-dark-accent"
              )}>
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="px-6 py-4 border-b border-white/10">
                      <h3 className="font-medium text-lg text-white">{note.title}</h3>
                      <p className="text-xs text-white/50 mt-1">
                        {formatDate(note.updated_at)}
                      </p>
                    </div>
                    
                    <div className="px-6 py-4 flex-grow">
                      <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-white/80 whitespace-pre-wrap">
                          {note.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Summaries; 