# Paramind LMS Architecture

## Data-Fetching Conventions

This project uses TanStack Query (v5) as the global data-fetching and caching layer. Following these conventions ensures consistent, efficient, and type-safe data management throughout the application.

### Query Keys

Query keys should be descriptive and follow a hierarchical structure:

```ts
// For individual resources
['lesson', slug][('user', userId)][('node', nodeId)][
  // For lists
  'lessons'
]['users'][('nodes', { clusterId })][
  // For derived/filtered data
  ('lessons', 'by-user', userId)
][('sr-cards', 'due', userId)];
```

### Query Functions

- Use `supabase.from("table")` for table operations
- Use `supabase.rpc("function")` for database functions
- Always handle errors by throwing them (TanStack Query will catch and manage them)

```ts
// Table queries
const { data, error } = await supabase
  .from('lessons')
  .select('*')
  .eq('slug', slug)
  .single();

if (error) throw error;
return data;

// RPC queries
const { data, error } = await supabase.rpc('ping');
if (error) throw error;
return data;
```

### Mutations

- Use optimistic updates for better UX
- Invalidate related queries after successful mutations
- Handle errors gracefully with toast notifications

```ts
const mutation = useMutation({
  mutationFn: updateLesson,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['lesson', slug] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['lesson', slug]);

    // Optimistically update
    queryClient.setQueryData(['lesson', slug], newData);

    return { previous };
  },
  onError: (err, newData, context) => {
    // Revert optimistic update
    queryClient.setQueryData(['lesson', slug], context?.previous);
  },
  onSettled: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['lesson', slug] });
  },
});
```

### Configuration

The global query client is configured with:

- **staleTime**: 5 minutes (data considered fresh)
- **gcTime**: 30 minutes (cache garbage collection)
- **refetchOnWindowFocus**: disabled (prevents unnecessary refetches)

### Development Tools

React Query DevTools are available in development mode only. They provide:

- Query state visualization
- Cache inspection
- Performance monitoring
- Manual query triggering

Access them through the floating TanStack Query icon in the bottom-left corner of your browser during development.
