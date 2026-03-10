import { useState } from 'react';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuthStore } from '../../stores';
import { useAdminAssets } from '../../hooks';
import type { CreateAssetRequest, AssetType } from '../../types';
import { LoadingScreen, AdminHeader } from '../../components';

export const Route = createLazyFileRoute('/admin/products')({
      component: AdminAssets
});

function AdminAssets() {
      const { user, isLoading: isAuthLoading } = useAuthStore();
      const [showCreateModal, setShowCreateModal] = useState(false);
      const { assets, loadingAssets, page, setPage, total, handleCreateAsset, handleDeleteAsset } = useAdminAssets();

      // Redirect non-admin users
      if (!isAuthLoading && (!user || user.role !== 'ADMIN')) {
            return <Navigate to="/" />;
      }

      const onCreateSuccess = async (assetData: CreateAssetRequest) => {
            const success = await handleCreateAsset(assetData);
            if (success) {
                  setShowCreateModal(false);
            }
            return success;
      };

      if (isAuthLoading) {
            return <LoadingScreen message="Syncing Asset Database" progress={30} />;
      }

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary)">
                  <AdminHeader title="Asset Management" subtitle="Create & Manage Assets" />

                  {/* Main Content */}
                  <main className="container mx-auto px-6 py-8">
                        <div className="flex justify-between items-center mb-6">
                              <h2 className="text-xl font-black uppercase tracking-tighter">Database_Registry</h2>
                              <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="px-6 py-2 bg-(--accent-primary) text-white font-black uppercase tracking-widest text-xs hover:bg-(--accent-secondary) transition-all shadow-lg shadow-(--accent-primary)/20"
                              >
                                    + ADD_NEW_ASSET
                              </button>
                        </div>

                        {/* Assets Table */}
                        <div className="glass border-2 border-(--border-default) overflow-hidden">
                              <table className="w-full">
                                    <thead>
                                          <tr className="border-b-2 border-(--border-default) bg-(--bg-elevated)">
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      ASSET
                                                </th>
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      CATEGORY
                                                </th>
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      PRICE
                                                </th>
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      STOCK
                                                </th>
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      STATUS
                                                </th>
                                                <th className="text-left p-4 micro-text text-xs text-(--text-muted)">
                                                      ACTIONS
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {loadingAssets ? (
                                                <tr>
                                                      <td colSpan={6} className="text-center py-12 text-(--text-muted)">
                                                            Loading assets...
                                                      </td>
                                                </tr>
                                          ) : assets.length === 0 ? (
                                                <tr>
                                                      <td colSpan={6} className="text-center py-12 text-(--text-muted)">
                                                            No assets found. Create your first asset to get started.
                                                      </td>
                                                </tr>
                                          ) : (
                                                assets.map(asset => (
                                                      <tr
                                                            key={asset._id}
                                                            className="border-b border-(--border-default) hover:bg-(--bg-hover) transition-colors"
                                                      >
                                                            <td className="p-4">
                                                                  <div className="font-bold text-sm">{asset.name}</div>
                                                                  <div className="text-xs text-(--text-muted) truncate max-w-xs">
                                                                        {asset.description}
                                                                  </div>
                                                            </td>
                                                            <td className="p-4 text-sm text-(--text-secondary)">
                                                                  {asset.category}
                                                            </td>
                                                            <td className="p-4 font-bold mono-number">
                                                                  ${asset.price.toFixed(2)}
                                                            </td>
                                                            <td className="p-4 mono-number">
                                                                  <span
                                                                        className={
                                                                              asset.stock > 10
                                                                                    ? 'text-(--data-success)'
                                                                                    : 'text-(--data-danger)'
                                                                        }
                                                                  >
                                                                        {asset.stock}
                                                                  </span>
                                                            </td>
                                                            <td className="p-4">
                                                                  <span
                                                                        className={`px-2 py-1 text-xs font-bold ${
                                                                              asset.isActive
                                                                                    ? 'bg-(--data-success)'
                                                                                    : 'bg-(--text-muted)'
                                                                        } text-white`}
                                                                  >
                                                                        {asset.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                                  </span>
                                                            </td>
                                                            <td className="p-4">
                                                                  <button
                                                                        onClick={() => handleDeleteAsset(asset._id)}
                                                                        className="text-(--data-danger) hover:underline text-sm font-bold"
                                                                  >
                                                                        DELETE
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))
                                          )}
                                    </tbody>
                              </table>
                        </div>

                        {/* Pagination */}
                        {total > 10 && (
                              <div className="flex justify-center gap-4 mt-6">
                                    <button
                                          onClick={() => setPage(p => Math.max(1, p - 1))}
                                          disabled={page === 1}
                                          className="px-4 py-2 bg-(--bg-elevated) border-2 border-(--border-default) disabled:opacity-50"
                                    >
                                          PREV
                                    </button>
                                    <span className="px-4 py-2 text-(--text-secondary)">
                                          Page {page} of {Math.ceil(total / 10)}
                                    </span>
                                    <button
                                          onClick={() => setPage(p => p + 1)}
                                          disabled={page >= Math.ceil(total / 10)}
                                          className="px-4 py-2 bg-(--bg-elevated) border-2 border-(--border-default) disabled:opacity-50"
                                    >
                                          NEXT
                                    </button>
                              </div>
                        )}
                  </main>

                  {/* Create Modal */}
                  {showCreateModal && (
                        <CreateAssetModal onClose={() => setShowCreateModal(false)} onCreate={onCreateSuccess} />
                  )}
            </div>
      );
}

// Create Asset Modal Component
interface CreateAssetModalProps {
      onClose: () => void;
      onCreate: (data: CreateAssetRequest) => Promise<boolean>;
}

function CreateAssetModal({ onClose, onCreate }: CreateAssetModalProps) {
      const [formData, setFormData] = useState<CreateAssetRequest>({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            assetType: 'event_pass' as AssetType,
            tags: []
      });
      const [submitting, setSubmitting] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitting(true);
            const success = await onCreate(formData);
            setSubmitting(false);
            if (success) {
                  setFormData({
                        name: '',
                        description: '',
                        price: 0,
                        stock: 0,
                        category: '',
                        assetType: 'event_pass' as AssetType,
                        tags: []
                  });
            }
      };

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="glass border-2 border-(--border-accent) p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-black mb-4">CREATE NEW ASSET</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                          ASSET NAME *
                                    </label>
                                    <input
                                          type="text"
                                          required
                                          value={formData.name}
                                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          placeholder="Digital Event Pass"
                                    />
                              </div>

                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                          DESCRIPTION *
                                    </label>
                                    <textarea
                                          required
                                          value={formData.description}
                                          onChange={e => setFormData({ ...formData, description: e.target.value })}
                                          rows={3}
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none resize-none"
                                          placeholder="Premium digital asset with..."
                                    />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                    <div>
                                          <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                                PRICE ($) *
                                          </label>
                                          <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={e =>
                                                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                    </div>
                                    <div>
                                          <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                                STOCK *
                                          </label>
                                          <input
                                                type="number"
                                                required
                                                min="0"
                                                value={formData.stock}
                                                onChange={e =>
                                                      setFormData({ ...formData, stock: parseInt(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                    </div>
                              </div>

                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                          ASSET TYPE *
                                    </label>
                                    <select
                                          required
                                          value={formData.assetType}
                                          onChange={e =>
                                                setFormData({ ...formData, assetType: e.target.value as AssetType })
                                          }
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                    >
                                          <option value="event_pass">Event Pass</option>
                                          <option value="identity_badge">Identity Badge</option>
                                          <option value="smart_device">Smart Device</option>
                                          <option value="intel_report">Intel Report</option>
                                    </select>
                              </div>

                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                          CATEGORY *
                                    </label>
                                    <select
                                          required
                                          value={formData.category}
                                          onChange={e => setFormData({ ...formData, category: e.target.value })}
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                    >
                                          <option value="">Select category...</option>
                                          <option value="electronics">Electronics</option>
                                          <option value="clothing">Clothing</option>
                                          <option value="food">Food</option>
                                          <option value="home">Home & Garden</option>
                                          <option value="sports">Sports</option>
                                    </select>
                              </div>

                              <div className="flex gap-4 pt-4">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="flex-1 px-4 py-2 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-colors font-bold"
                                    >
                                          CANCEL
                                    </button>
                                    <button
                                          type="submit"
                                          disabled={submitting}
                                          className="flex-1 px-4 py-2 bg-(--accent-primary) text-white font-bold hover:bg-(--accent-secondary) transition-colors disabled:opacity-50"
                                    >
                                          {submitting ? 'CREATING...' : 'CREATE ASSET'}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
