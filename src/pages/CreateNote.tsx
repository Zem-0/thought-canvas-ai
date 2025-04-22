
import Layout from '@/components/Layout';
import NoteEditor from '@/components/NoteEditor';

const CreateNote = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Note</h1>
          <p className="text-muted-foreground">
            Capture your thoughts and ideas
          </p>
        </div>
        
        <NoteEditor />
      </div>
    </Layout>
  );
};

export default CreateNote;
