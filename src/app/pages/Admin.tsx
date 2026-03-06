import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Trash2, LogOut, RefreshCcw, Upload, Plus, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService, type AdminUser, type ContentItem } from '../../services/adminService';
import { resourceService } from '../../services/resourceService';
import { getSocket } from '../../services/socketService';

interface ResourceItem {
  _id: string;
  title: string;
  category: string;
  type: string;
  views: number;
  downloads: number;
  fileUrl: string;
}

type Tab = 'users' | 'content' | 'resources';

const initialContentForm = {
  title: '',
  type: 'announcement' as ContentItem['type'],
  body: '',
  tags: '',
};

export default function AdminPanel() {
  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activeUsers, setActiveUsers] = useState<AdminUser[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [contentForm, setContentForm] = useState(initialContentForm);

  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: '',
    type: 'past_paper',
    description: '',
  });

  const loadAll = async () => {
    try {
      setLoading(true);
      setError('');

      const [loadedUsers, loadedActiveUsers, loadedContent, loadedResources] = await Promise.all([
        adminService.getUsers(),
        adminService.getActiveUsers(),
        adminService.getContent(),
        resourceService.getResources(),
      ]);

      setUsers(loadedUsers);
      setActiveUsers(loadedActiveUsers);
      setContentItems(loadedContent);
      setResources(loadedResources as ResourceItem[]);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAll();
    }
  }, [user?.role]);

  useEffect(() => {
    const socket = getSocket();
    const reload = () => {
      void loadAll();
    };

    socket.on('auth:user-registered', reload);
    socket.on('auth:user-login', reload);
    socket.on('auth:user-logout', reload);
    socket.on('admin:user-deleted', reload);
    socket.on('admin:user-force-logout', reload);
    socket.on('admin:content-created', reload);
    socket.on('admin:content-updated', reload);
    socket.on('admin:content-deleted', reload);
    socket.on('resources:created', reload);
    socket.on('resources:updated', reload);
    socket.on('resources:deleted', reload);

    return () => {
      socket.off('auth:user-registered', reload);
      socket.off('auth:user-login', reload);
      socket.off('auth:user-logout', reload);
      socket.off('admin:user-deleted', reload);
      socket.off('admin:user-force-logout', reload);
      socket.off('admin:content-created', reload);
      socket.off('admin:content-updated', reload);
      socket.off('admin:content-deleted', reload);
      socket.off('resources:created', reload);
      socket.off('resources:updated', reload);
      socket.off('resources:deleted', reload);
    };
  }, []);

  const stats = useMemo(() => {
    return {
      totalUsers: users.length,
      onlineUsers: activeUsers.length,
      totalContent: contentItems.length,
      totalResources: resources.length,
    };
  }, [users.length, activeUsers.length, contentItems.length, resources.length]);

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Delete this user permanently?')) return;

    try {
      await adminService.deleteUser(id);
      setSuccess('User deleted successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to delete user');
    }
  };

  const handleForceLogout = async (id: string) => {
    try {
      await adminService.forceLogoutUser(id);
      setSuccess('User logged out successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to log out user');
    }
  };

  const handleCreateContent = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await adminService.createContent({
        title: contentForm.title,
        type: contentForm.type,
        body: contentForm.body,
        tags: contentForm.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setContentForm(initialContentForm);
      setSuccess('Content created successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to create content item');
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!window.confirm('Delete this content item?')) return;

    try {
      await adminService.deleteContent(id);
      setSuccess('Content deleted successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to delete content');
    }
  };

  const handleUploadResource = async (event: FormEvent) => {
    event.preventDefault();

    if (!resourceFile) {
      setError('Please select a file before creating a resource.');
      return;
    }

    try {
      setLoading(true);
      const uploaded = await resourceService.uploadFile(resourceFile);
      await resourceService.createResource({
        title: resourceForm.title,
        description: resourceForm.description,
        type: resourceForm.type,
        category: resourceForm.category,
        fileUrl: uploaded.fileUrl,
        fileType: resourceFile.type || 'application/octet-stream',
      });

      setResourceFile(null);
      setResourceForm({ title: '', category: '', type: 'past_paper', description: '' });
      setSuccess('Resource uploaded and published successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to upload resource');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm('Delete this resource?')) return;

    try {
      await resourceService.deleteResource(id);
      setSuccess('Resource deleted successfully');
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to delete resource');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800">Access Denied</h2>
          <p className="mt-1 text-sm text-red-700">This area is only available to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 space-y-4">
      <div className="rounded-2xl bg-slate-900 p-5 text-white">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-300">Manage users, live sessions, and platform content.</p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-xs text-slate-300">Total Users</p>
            <p className="text-xl font-semibold">{stats.totalUsers}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-xs text-slate-300">Active Sessions</p>
            <p className="text-xl font-semibold">{stats.onlineUsers}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-xs text-slate-300">Content Items</p>
            <p className="text-xl font-semibold">{stats.totalContent}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-xs text-slate-300">Resources</p>
            <p className="text-xl font-semibold">{stats.totalResources}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setTab('users')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'users' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'}`}>
          Users
        </button>
        <button onClick={() => setTab('content')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'content' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'}`}>
          Content
        </button>
        <button onClick={() => setTab('resources')} className={`rounded-lg px-3 py-2 text-sm ${tab === 'resources' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200'}`}>
          Upload/Resources
        </button>
        <button onClick={() => void loadAll()} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <RefreshCcw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{success}</div>}

      {tab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-semibold">Registered Users</h2>
            <div className="space-y-3">
              {users.map((item) => (
                <div key={item._id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.email}</p>
                      <p className="text-xs text-slate-500">Role: {item.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => void handleForceLogout(item._id)} className="rounded-md border border-amber-200 bg-amber-50 p-2 text-amber-700" title="Force logout">
                        <LogOut className="h-4 w-4" />
                      </button>
                      <button onClick={() => void handleDeleteUser(item._id)} className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700" title="Delete user">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {users.length === 0 && <p className="text-sm text-slate-500">No users found.</p>}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-semibold">Currently Logged In</h2>
            <div className="space-y-3">
              {activeUsers.map((item) => (
                <div key={item._id} className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">{item.email}</p>
                  <p className="text-xs text-slate-500">Device: {item.activeDeviceId || 'unknown'}</p>
                </div>
              ))}
              {activeUsers.length === 0 && <p className="text-sm text-slate-500">No active sessions.</p>}
            </div>
          </div>
        </div>
      )}

      {tab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <form onSubmit={handleCreateContent} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <h2 className="text-lg font-semibold">Create Content</h2>
            <input
              value={contentForm.title}
              onChange={(event) => setContentForm((prev) => ({ ...prev, title: event.target.value }))}
              required
              placeholder="Content title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <select
              value={contentForm.type}
              onChange={(event) => setContentForm((prev) => ({ ...prev, type: event.target.value as ContentItem['type'] }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="announcement">Announcement</option>
              <option value="resource">Resource</option>
              <option value="update">Update</option>
              <option value="notice">Notice</option>
            </select>
            <textarea
              value={contentForm.body}
              onChange={(event) => setContentForm((prev) => ({ ...prev, body: event.target.value }))}
              required
              rows={4}
              placeholder="Write content body"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={contentForm.tags}
              onChange={(event) => setContentForm((prev) => ({ ...prev, tags: event.target.value }))}
              placeholder="Tags (comma separated)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              <Plus className="h-4 w-4" /> Publish Content
            </button>
          </form>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-semibold">Manage Content</h2>
            <div className="space-y-3">
              {contentItems.map((item) => (
                <div key={item._id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
                      <p className="mt-1 text-sm text-slate-700 line-clamp-2">{item.body}</p>
                    </div>
                    <button onClick={() => void handleDeleteContent(item._id)} className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {contentItems.length === 0 && <p className="text-sm text-slate-500">No content created yet.</p>}
            </div>
          </div>
        </div>
      )}

      {tab === 'resources' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <form onSubmit={handleUploadResource} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <h2 className="text-lg font-semibold">Upload App Content</h2>
            <input
              value={resourceForm.title}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
              required
              placeholder="Resource title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={resourceForm.category}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, category: event.target.value }))}
              required
              placeholder="Category / Subject"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <select
              value={resourceForm.type}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, type: event.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="past_paper">Past Paper</option>
              <option value="note">Note</option>
              <option value="video">Video</option>
              <option value="book">Book</option>
              <option value="other">Other</option>
            </select>
            <textarea
              value={resourceForm.description}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Description"
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <label className="block rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-600">
              <input
                type="file"
                className="mb-2 block w-full text-sm"
                onChange={(event) => setResourceFile(event.target.files?.[0] || null)}
                required
              />
              <span>Select file for upload</span>
            </label>
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
              <Upload className="h-4 w-4" /> {loading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </form>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-semibold">Existing Resources</h2>
            <div className="space-y-3">
              {resources.map((item) => (
                <div key={item._id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.category} • {item.type}</p>
                      <p className="text-xs text-slate-500">Views {item.views} • Downloads {item.downloads}</p>
                    </div>
                    <button onClick={() => void handleDeleteResource(item._id)} className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {resources.length === 0 && (
                <div className="rounded-lg border border-slate-100 p-4 text-sm text-slate-500 flex items-center gap-2">
                  <FileText className="h-4 w-4" /> No resources yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
