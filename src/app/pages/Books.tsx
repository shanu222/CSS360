import { useState, useEffect } from "react";
import { Search, Star, Download, BookOpen, Filter, Loader2, AlertCircle } from "lucide-react";
import { resourceService } from "../../services/resourceService";

const categories = ["All", "compulsory", "optional", "bestseller", "classic", "mcq"];

export default function Books() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await resourceService.getResources({ type: 'book' });
      setBooks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (book: any) => {
    try {
      await resourceService.incrementViews(book._id);
      if (book.fileUrl) {
        window.open(`/uploads/${book.fileUrl}`, '_blank');
      }
    } catch (err) {
      console.error('Failed to view book:', err);
    }
  };

  const handleDownload = async (book: any) => {
    try {
      await resourceService.incrementDownloads(book._id);
      if (book.fileUrl) {
        const link = document.createElement('a');
        link.href = `/uploads/${book.fileUrl}`;
        link.download = book.title;
        link.click();
      }
    } catch (err) {
      console.error('Failed to download book:', err);
    }
  };

  const filtered = books.filter((b) => {
    const matchSearch = b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()) ||
      b.description?.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || b.tags?.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,61,43,0.95) 0%, rgba(26,92,62,0.92) 100%), url(https://images.unsplash.com/photo-1760636381941-b6b8e871d268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl text-white mb-1">Books Library</h2>
        <p className="text-green-200 text-sm">Recommended books and resources for all CSS subjects</p>
        <div className="flex gap-6 mt-3">
          <div><p className="text-xl text-yellow-400 font-bold">{books.length}</p><p className="text-green-300 text-xs">Total Books</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">12+</p><p className="text-green-300 text-xs">Subjects Covered</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">Free</p><p className="text-green-300 text-xs">PDF Access</p></div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title, subject, or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-600 placeholder:text-gray-400 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTag(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 capitalize ${
                activeTag === cat
                  ? "bg-green-600 text-white shadow"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium text-sm">Failed to load books</p>
            <p className="text-red-600 text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={loadBooks}
            className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Books Grid */}
      {!loading && !error && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((book) => {
          const colorOptions = ['bg-blue-500', 'bg-green-600', 'bg-purple-500', 'bg-orange-500', 'bg-teal-500'];
          const bookColor = colorOptions[Math.abs(book.title?.charCodeAt(0) || 0) % colorOptions.length];
          
          return (
          <div key={book._id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-green-200 transition-all overflow-hidden group flex flex-col">
            {/* Book Spine Visual */}
            <div className={`${bookColor} h-28 flex items-center justify-center relative`}>
              <BookOpen className="w-10 h-10 text-white/80" />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-2 right-2">
                {book.tags?.includes("bestseller") && (
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" /> Bestseller
                  </span>
                )}
                {book.tags?.includes("classic") && (
                  <span className="bg-purple-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">Classic</span>
                )}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{book.category || 'General'}</span>
              </div>
              <h4 className="text-gray-800 font-semibold text-sm mb-0.5 group-hover:text-green-700 transition-colors line-clamp-2">{book.title}</h4>
              {book.metadata?.author && (
                <p className="text-gray-500 text-xs">by {book.metadata.author}{book.metadata.edition && ` · ${book.metadata.edition}`}</p>
              )}
              <p className="text-gray-600 text-xs mt-2 flex-1 line-clamp-2">{book.description}</p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {book.views || 0} views · {book.downloads || 0} downloads
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(book)}
                    className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(book)}
                    className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500">No books found matching your search.</p>
        </div>
      )}

      {/* Suggest More */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center">
        <p className="text-green-800 font-medium">📚 Can't find a book?</p>
        <p className="text-green-600 text-sm mt-1">Request additions to the library or use AI to get book summaries and key chapter notes.</p>
        <button className="mt-3 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Request a Book
        </button>
      </div>
    </div>
  );
}
