import { useState, useEffect } from 'react';
import { Plus, FileText, Video, BookOpen, File, Search, Filter, Download, Eye, Trash2, Edit, CheckCircle, XCircle, Upload, Loader2 } from 'lucide-react';
import { resourceService } from '../../services/resourceService';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [resources, setResources] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'past_paper',
    category: '',
    year: new Date().getFullYear(),
    solved: false,
    tags: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadResources();
      loadStatistics();
    }
  }, [user]);

  const loadResources = async () => {
    try {
      const data = await resourceService.getResources();
      setResources(data);
    } catch (err: any) {
      console.error('Failed to load resources:', err);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await resourceService.getStatistics();
      setStatistics(data);
    } catch (err: any) {
      console.error('Failed to load statistics:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const response = await resourceService.uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      setUploadedFileUrl(response.fileUrl);
      setSuccess('File uploaded successfully!');
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFileUrl) {
      setError('Please upload a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileType = selectedFile?.type || 'application/pdf';
      const fileSize = selectedFile?.size || 0;

      await resourceService.createResource({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        category: formData.category,
        year: formData.type === 'past_paper' ? formData.year : undefined,
        fileUrl: uploadedFileUrl,
        fileType,
        fileSize,
        solved: formData.solved,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      });

      setSuccess('Resource created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'past_paper',
        category: '',
        year: new Date().getFullYear(),
        solved: false,
        tags: '',
      });
      setUploadedFileUrl('');
      
      // Reload data
      loadResources();
      loadStatistics();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      await resourceService.deleteResource(id);
      setSuccess('Resource deleted successfully');
      loadResources();
      loadStatistics();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete resource');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-5 text-white">
        <h2 className="text-2xl text-white mb-1">Admin Panel</h2>
        <p className="text-purple-200 text-sm">Upload and manage all platform content</p>
        
        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-purple-300 text-xs">Total Resources</p>
              <p className="text-white font-semibold text-xl mt-0.5">{statistics.totalResources}</p>
            </div>
            {statistics.byType?.map((stat: any) => (
              <div key={stat._id} className="bg-white/10 rounded-xl p-3">
                <p className="text-purple-300 text-xs capitalize">{stat._id.replace('_', ' ')}</p>
                <p className="text-white font-semibold text-xl mt-0.5">{stat.count}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Content
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'manage'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <File className="w-4 h-4 inline mr-2" />
          Manage Resources
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    PDF, DOC, PPT, MP4, or images (max 100MB)
                  </p>
                </label>
              </div>

              {selectedFile && !uploadedFileUrl && (
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={loading}
                  className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload File
                    </>
                  )}
                </button>
              )}

              {uploadedFileUrl && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  ✓ File uploaded successfully!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., CSS 2024 Pakistan Affairs Paper"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="past_paper">Past Paper</option>
                  <option value="note">Notes</option>
                  <option value="video">Video</option>
                  <option value="book">Book</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category/Subject *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Pakistan Affairs"
                />
              </div>

              {/* Year */}
              {formData.type === 'past_paper' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    min="2000"
                    max="2030"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Brief description of the resource..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., compulsory, essay, important"
              />
            </div>

            {/* Solved checkbox for past papers */}
            {formData.type === 'past_paper' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="solved"
                  checked={formData.solved}
                  onChange={(e) => setFormData({ ...formData, solved: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="solved" className="text-sm text-gray-700">
                  Answers/Solutions Available
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !uploadedFileUrl}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Resource...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Resource
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">All Resources</h3>
            <p className="text-sm text-gray-600 mt-1">
              {resources.length} resources total
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {resources.map((resource) => (
              <div key={resource._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{resource.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="capitalize">{resource.type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{resource.category}</span>
                      {resource.year && (
                        <>
                          <span>•</span>
                          <span>{resource.year}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{resource.views} views</span>
                      <span>•</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(resource.fileUrl, '_blank')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resource._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {resources.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <File className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No resources uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
