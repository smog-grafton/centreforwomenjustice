# Full-Stack SEO Integration Guide: Next.js + Laravel

This document outlines the complete architecture and implementation details for integrating SEO in a Next.js frontend powered by a headless Laravel backend. It covers both static pages and dynamic content, including database schemas, Laravel controllers, and Next.js metadata generation.

---

## 1. Database Schema (MySQL)

To manage SEO metadata dynamically from the Laravel backend, we need to store SEO fields. The best approach is a polymorphic `seo_metadata` table so any model (Post, Page, Product) can have SEO data without cluttering their respective tables.

### Migration: `create_seo_metadata_table.php`

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seo_metadata', function (Blueprint $table) {
            $table->id();
            $table->morphs('seoable'); // Creates seoable_id and seoable_type
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('og_image')->nullable();
            $table->string('twitter_card')->default('summary_large_image');
            $table->boolean('noindex')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seo_metadata');
    }
};
```

---

## 2. Laravel Backend Implementation

### A. The Trait: `HasSeoMetadata.php`

Create a trait to easily add SEO capabilities to any Eloquent model (e.g., `Post`, `Page`).

```php
namespace App\Traits;

use App\Models\SeoMetadata;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasSeoMetadata
{
    public function seo(): MorphOne
    {
        return $this->morphOne(SeoMetadata::class, 'seoable');
    }

    // Helper to get fallback SEO data if specific metadata is missing
    public function getSeoDataAttribute()
    {
        $seo = $this->seo;
        
        return [
            'meta_title' => $seo->meta_title ?? $this->title ?? $this->name,
            'meta_description' => $seo->meta_description ?? $this->excerpt ?? null,
            'canonical_url' => $seo->canonical_url ?? null,
            'og_image' => $seo->og_image ? asset('storage/' . $seo->og_image) : null,
            'noindex' => $seo->noindex ?? false,
        ];
    }
}
```

### B. The Model: `Post.php`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasSeoMetadata;

class Post extends Model
{
    use HasSeoMetadata;

    protected $fillable = ['title', 'slug', 'content', 'excerpt'];
    
    // Eager load SEO data by default (optional, but good for API performance)
    protected $with = ['seo']; 
}
```

### C. API Resource: `PostResource.php`

Format the JSON response to include the SEO data cleanly for Next.js.

```php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'excerpt' => $this->excerpt,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
            'seo' => $this->seo_data, // Injected from the trait
        ];
    }
}
```

### D. Controller: `PostController.php`

```php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)->latest()->get();
        return PostResource::collection($posts);
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return new PostResource($post);
    }
    
    // Endpoint specifically for Next.js generateStaticParams()
    public function slugs()
    {
        return Post::where('is_published', true)->pluck('slug');
    }
}
```

---

## 3. Next.js Frontend Implementation

### A. Static Pages (No Dynamic Params)

For static pages (like Home, About, Contact), we use the static `metadata` export. To do this in Next.js App Router, the page *must* be a Server Component. 

If your page requires client-side interactivity (e.g., `framer-motion`, `useState`), split it into two files:
1. `page.tsx` (Server Component, exports metadata)
2. `ClientComponent.tsx` (Client Component, contains the UI)

**Example: `app/about/page.tsx`**
```tsx
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission, vision, and the team behind the organization.',
};

export default function AboutPage() {
  return <AboutClient />;
}
```

### B. Dynamic Pages (Content from Laravel)

For pages driven by the database (e.g., `/blog/[slug]`), use `generateMetadata` and `generateStaticParams`.

**Example: `app/blog/[slug]/page.tsx`**
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 1. Generate Static Params for Vercel Build
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/slugs`);
  const slugs = await res.json();
 
  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}

// 2. Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`);
  
  if (!res.ok) return {};
  
  const { data: post } = await res.json();

  return {
    title: post.seo.meta_title,
    description: post.seo.meta_description,
    alternates: {
      canonical: post.seo.canonical_url || `/blog/${post.slug}`,
    },
    robots: {
      index: !post.seo.noindex,
      follow: !post.seo.noindex,
    },
    openGraph: post.seo.og_image ? {
      images: [post.seo.og_image],
    } : undefined,
  };
}

// 3. Page Component
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`);
  
  if (!res.ok) notFound();
  
  const { data: post } = await res.json();
  
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.seo.og_image,
    datePublished: post.created_at,
    dateModified: post.updated_at,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

---

## 4. On-Demand Revalidation (Webhooks)

To keep Vercel's static cache perfectly in sync with your Laravel database without waiting for time-based revalidation, use On-Demand ISR.

### A. Next.js Revalidation API Route
Create `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const path = body.path; // e.g., '/blog/my-new-post'

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, message: 'Missing path' }, { status: 400 });
}
```

### B. Laravel Webhook Service
In Laravel, trigger this webhook whenever a post is saved or updated.

```php
namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Http;

class PostObserver
{
    public function saved(Post $post)
    {
        $this->revalidateNextJsCache('/blog/' . $post->slug);
        $this->revalidateNextJsCache('/blog'); // Revalidate the blog index too
    }

    protected function revalidateNextJsCache($path)
    {
        $nextJsUrl = config('services.nextjs.url') . '/api/revalidate';
        $secret = config('services.nextjs.revalidate_secret');

        Http::withHeaders([
            'x-revalidate-secret' => $secret,
        ])->post($nextJsUrl, [
            'path' => $path,
        ]);
    }
}
```

---

## 5. Dynamic Sitemap Generation

Create `app/sitemap.ts` to automatically generate a `sitemap.xml` that includes both your static pages and dynamic Laravel content.

```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic URLs from Laravel
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const { data: posts } = await res.json();
  
  const blogUrls = posts.map((post: any) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
```

### Summary of Best Practices
1. **Deduplication:** Next.js automatically deduplicates `fetch` requests. Calling the same API endpoint in `generateMetadata` and your page component only hits your Laravel server once.
2. **Polymorphic SEO:** Using a polymorphic table in Laravel keeps your main tables clean while allowing any entity to have SEO metadata.
3. **Server Components:** Always export `metadata` from Server Components. If you need client interactivity, wrap the UI in a child Client Component.
4. **Webhooks over Polling:** Use On-Demand ISR (Webhooks) instead of time-based revalidation (`revalidate: 3600`) to ensure content is instantly updated when changed in the Laravel admin panel.
