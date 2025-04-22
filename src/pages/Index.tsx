
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to organize your thoughts?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of AI-assisted note-taking. 
            Try ThoughtCanvas today and transform how you capture ideas.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link to="/auth?mode=signup">Start for free</Link>
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold text-primary">ThoughtCanvas</span>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} ThoughtCanvas. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/auth?mode=signin" className="text-sm text-muted-foreground hover:text-primary">
                Sign In
              </Link>
              <Link to="/auth?mode=signup" className="text-sm text-muted-foreground hover:text-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
