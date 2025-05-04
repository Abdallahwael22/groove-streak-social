
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      // In a real app, we would fetch results from an API
      // For now, we'll simulate search results
      const demoResults = [
        { id: 1, title: 'Morning Meditation', type: 'habit', category: 'Mindfulness' },
        { id: 2, title: '30 Day Morning Routine', type: 'challenge', category: 'Productivity' },
        { id: 3, title: 'Morning Workout', type: 'habit', category: 'Fitness' },
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(demoResults);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Search Results</h1>
          <form onSubmit={handleSearch} className="flex max-w-md items-center space-x-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search habits, challenges..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {searchParams.get('q') ? (
          <>
            <p className="text-muted-foreground mb-4">
              Found {results.length} results for "{searchParams.get('q')}"
            </p>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.id} className="p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{result.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span className="capitalize">{result.type}</span>
                          <span>·</span>
                          <span>{result.category}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg bg-card">
                <p className="text-muted-foreground">No results found for "{searchParams.get('q')}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try using different keywords or filters</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-card">
            <p className="text-muted-foreground">Enter a search query to find habits, challenges, and more</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
