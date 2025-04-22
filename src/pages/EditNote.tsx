
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import NoteEditor from '@/components/NoteEditor';

const EditNote = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Note</h1>
          <p className="text-muted-foreground">
            Make changes to your note
          </p>
        </div>
        
        <NoteEditor noteId={id} />
      </div>
    </Layout>
  );
};

export default EditNote;
