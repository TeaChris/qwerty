import { useState } from 'react';
import { createCategory } from '../../services';
import { ThemedSelect } from '../index';
import type { CreateAssetRequest, AssetType, Category } from '../../types';

interface CreateAssetModalProps {
      onClose: () => void;
      onCreate: (data: CreateAssetRequest) => Promise<boolean>;
      categories: Category[];
      onCategoryCreated: () => Promise<void>;
}

export function CreateAssetModal({ onClose, onCreate, categories, onCategoryCreated }: CreateAssetModalProps) {
      const [formData, setFormData] = useState<CreateAssetRequest>({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            assetType: 'event_pass' as AssetType,
            tags: [],
            images: ['']
      });
      const [submitting, setSubmitting] = useState(false);
      const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
      const [newCategoryName, setNewCategoryName] = useState('');
      const [creatingCategory, setCreatingCategory] = useState(false);

      const handleCreateCategory = async () => {
            if (!newCategoryName.trim()) return;
            setCreatingCategory(true);
            const { data, error } = await createCategory({ name: newCategoryName });
            setCreatingCategory(false);

            if (data) {
                  await onCategoryCreated();
                  setFormData({ ...formData, category: data.data.category.name });
                  setNewCategoryName('');
                  setShowNewCategoryInput(false);
            } else if (error) {
                  // Error handled by interceptor toast
            }
      };

      const formatImageUrl = (url: string) => {
            if (!url) return url;
            // Handle Unsplash page links (extracting the ID from the end of the slug)
            const unsplashMatch = url.match(/unsplash\.com\/photos\/(?:.*-)?([\w-]+)(?:$|\/|\?)/);
            if (unsplashMatch && unsplashMatch[1]) {
                  const id = unsplashMatch[1];
                  // Use a robust placeholder pattern for Unsplash IDs
                  return `https://images.unsplash.com/photo-1?ixid=${id}&auto=format&fit=crop&w=800&q=80`;
            }
            return url;
      };

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
                        tags: [],
                        images: ['']
                  });
            }
      };

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 text-(--text-primary)">
                  <div className="glass border-2 border-(--border-accent) p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Left Side: Form */}
                              <div className="space-y-4">
                                    <h2 className="text-xl font-black">CREATE NEW ASSET</h2>
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
                                                      onChange={e =>
                                                            setFormData({ ...formData, description: e.target.value })
                                                      }
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
                                                                  setFormData({
                                                                        ...formData,
                                                                        price: parseFloat(e.target.value)
                                                                  })
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
                                                                  setFormData({
                                                                        ...formData,
                                                                        stock: parseInt(e.target.value)
                                                                  })
                                                            }
                                                            className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                                      />
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-2 gap-4">
                                                <ThemedSelect
                                                      label="ASSET TYPE *"
                                                      value={formData.assetType}
                                                      onChange={val =>
                                                            setFormData({ ...formData, assetType: val as AssetType })
                                                      }
                                                      options={[
                                                            { value: 'event_pass', label: 'Event Pass' },
                                                            { value: 'identity_badge', label: 'Identity Badge' },
                                                            { value: 'smart_device', label: 'Smart Device' },
                                                            { value: 'intel_report', label: 'Intel Report' }
                                                      ]}
                                                />

                                                <div>
                                                      <div className="flex justify-between items-center mb-2">
                                                            <label className="block micro-text text-xs text-(--text-muted)">
                                                                  CATEGORY *
                                                            </label>
                                                            <button
                                                                  type="button"
                                                                  onClick={() =>
                                                                        setShowNewCategoryInput(!showNewCategoryInput)
                                                                  }
                                                                  className="text-xs font-bold text-(--accent-primary) hover:underline"
                                                            >
                                                                  {showNewCategoryInput ? 'CANCEL' : '+ CREATE NEW'}
                                                            </button>
                                                      </div>

                                                      {showNewCategoryInput ? (
                                                            <div className="flex gap-2">
                                                                  <input
                                                                        type="text"
                                                                        value={newCategoryName}
                                                                        onChange={e =>
                                                                              setNewCategoryName(e.target.value)
                                                                        }
                                                                        className="flex-1 px-4 py-2 bg-(--bg-surface) border-2 border-(--accent-primary) text-(--text-primary) outline-none text-sm"
                                                                        placeholder="New category..."
                                                                        autoFocus
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        onClick={handleCreateCategory}
                                                                        disabled={creatingCategory}
                                                                        className="px-4 py-2 bg-(--accent-primary) text-white font-bold text-xs disabled:opacity-50"
                                                                  >
                                                                        {creatingCategory ? '...' : 'ADD'}
                                                                  </button>
                                                            </div>
                                                      ) : (
                                                            <ThemedSelect
                                                                  value={formData.category}
                                                                  onChange={val =>
                                                                        setFormData({ ...formData, category: val })
                                                                  }
                                                                  options={categories.map(c => ({
                                                                        value: c.name,
                                                                        label: c.name
                                                                  }))}
                                                                  placeholder="Select category..."
                                                            />
                                                      )}
                                                </div>
                                          </div>

                                          <div className="flex justify-between items-center mb-2">
                                                <label className="block micro-text text-xs text-(--text-muted)">
                                                      IMAGE SOURCE URL
                                                </label>
                                                <span className="text-[9px] text-(--accent-primary) font-bold animate-pulse">
                                                      AUTO_SIGNAL_DETECT
                                                </span>
                                          </div>
                                          <input
                                                type="url"
                                                value={formData.images?.[0] || ''}
                                                onChange={e =>
                                                      setFormData({
                                                            ...formData,
                                                            images: [e.target.value]
                                                      })
                                                }
                                                className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none font-mono text-[10px]"
                                                placeholder="Paste any link..."
                                          />
                                          <div className="mt-2 p-2 bg-(--accent-primary)/5 border border-(--accent-primary)/20">
                                                <p className="text-[9px] text-(--text-muted) leading-relaxed">
                                                      <span className="text-(--accent-primary) font-bold">INFO:</span> Paste a direct image link OR an Unsplash page URL. For Unsplash, the system will automatically extract the feed ID.
                                                </p>
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

                              {/* Right Side: Live Preview */}
                              <div className="flex flex-col h-full bg-(--bg-canvas) border-2 border-(--border-default) relative overflow-hidden group">
                                    {/* Tech Borders */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-(--accent-primary) z-10" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-(--accent-primary) z-10" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-(--accent-primary) z-10" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-(--accent-primary) z-10" />

                                    {/* Header */}
                                    <div className="p-3 border-b-2 border-(--border-default) bg-(--bg-surface) flex justify-between items-center">
                                          <div className="micro-text text-[10px] text-(--text-muted)">
                                                VISUAL_DATA_FEED_01
                                          </div>
                                          <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-(--data-success) animate-pulse" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-(--data-warning)" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-(--data-danger)" />
                                          </div>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[300px]">
                                          {formData.images?.[0] ? (
                                                <>
                                                      <img
                                                            key={formData.images[0]}
                                                            src={formatImageUrl(formData.images[0])}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover animate-fade-in group-hover:scale-105 transition-transform duration-700"
                                                            onError={e => {
                                                                  (e.target as HTMLImageElement).src =
                                                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23141418"/%3E%3Ctext x="50" y="50" font-family="monospace" font-size="8" fill="%233d3d4a" text-anchor="middle" dominant-baseline="middle"%3EINVALID_FEED%3C/text%3E%3C/svg%3E';
                                                            }}
                                                      />
                                                      {/* Scanner Effect */}
                                                      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-(--accent-primary)/5 to-transparent animate-scan" />
                                                </>
                                          ) : (
                                                <div className="flex flex-col items-center space-y-4 opacity-40">
                                                      <div className="text-6xl text-(--border-bright)">📡</div>
                                                      <div className="micro-text text-[10px] tracking-widest text-center">
                                                            AWAITING_SIGNAL...
                                                            <br />
                                                            INPUT_SOURCE_REQUIRED
                                                      </div>
                                                </div>
                                          )}

                                          {/* CRT Scanline Overlay */}
                                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] z-0 bg-size-[100%_2px,3px_100%]" />
                                    </div>

                                    {/* Footer Info */}
                                    <div className="p-3 bg-(--bg-surface) border-t-2 border-(--border-default) flex justify-between">
                                          <div className="micro-text text-[8px] text-(--accent-primary)">
                                                STATUS: {formData.images?.[0] ? 'FEED_LIVE' : 'IDLE'}
                                          </div>
                                          <div className="micro-text text-[8px] text-(--text-muted)">
                                                COORD: 40.7128° N, 74.0060° W
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
