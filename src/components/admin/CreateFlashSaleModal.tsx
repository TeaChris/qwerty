import React from 'react';
import { useFlashSaleForm } from '../../hooks';
import type { CreateFlashSaleRequest } from '../../types';

interface CreateFlashSaleModalProps {
      onClose: () => void;
      onCreate: (data: CreateFlashSaleRequest) => Promise<boolean>;
}

export function CreateFlashSaleModal({ onClose, onCreate }: CreateFlashSaleModalProps) {
      const {
            assets,
            formData,
            salePrice,
            addAsset,
            stockLimit,
            submitting,
            setFormData,
            handleSubmit,
            setSalePrice,
            removeAsset,
            setStockLimit,
            selectedAsset,
            setSelectedAsset
      } = useFlashSaleForm();

      const onFormSubmit = (e: React.FormEvent) => handleSubmit(e, onCreate);

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="glass border-2 border-(--border-accent) p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-black mb-4">CREATE NEW FLASH SALE</h2>

                        <form onSubmit={onFormSubmit} className="space-y-4">
                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">TITLE *</label>
                                    <input
                                          type="text"
                                          required
                                          value={formData.title}
                                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                                          placeholder="Black Friday Mega Sale"
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
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
                                          placeholder="Describe your flash sale..."
                                          rows={3}
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none resize-none"
                                    />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                    <div>
                                          <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                                START TIME *
                                          </label>
                                          <input
                                                type="datetime-local"
                                                required
                                                value={formData.startTime}
                                                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                                className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                    </div>
                                    <div>
                                          <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                                END TIME *
                                          </label>
                                          <input
                                                type="datetime-local"
                                                required
                                                value={formData.endTime}
                                                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                                className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                    </div>
                              </div>

                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">
                                          DURATION (MINUTES) *
                                    </label>
                                    <input
                                          type="number"
                                          required
                                          min="1"
                                          value={formData.duration}
                                          onChange={e =>
                                                setFormData({ ...formData, duration: parseInt(e.target.value) })
                                          }
                                          placeholder="60"
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                    />
                              </div>

                              {/* Add Assets Section */}
                              <div className="border-2 border-(--border-default) p-4">
                                    <h3 className="font-black mb-3">ADD ASSETS TO SALE</h3>

                                    <div className="grid grid-cols-4 gap-3 mb-3">
                                          <select
                                                value={selectedAsset}
                                                onChange={e => setSelectedAsset(e.target.value)}
                                                className="col-span-2 px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          >
                                                <option value="">Select asset...</option>
                                                {assets.map(asset => (
                                                      <option key={asset._id} value={asset._id}>
                                                            {asset.name} (${asset.price})
                                                      </option>
                                                ))}
                                          </select>
                                          <input
                                                type="number"
                                                placeholder="Sale Price"
                                                min="0"
                                                step="0.01"
                                                value={salePrice || ''}
                                                onChange={e => setSalePrice(parseFloat(e.target.value))}
                                                className="px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                          <input
                                                type="number"
                                                placeholder="Stock"
                                                min="1"
                                                value={stockLimit || ''}
                                                onChange={e => setStockLimit(parseInt(e.target.value))}
                                                className="px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          />
                                    </div>

                                    <button
                                          type="button"
                                          onClick={addAsset}
                                          className="w-full px-4 py-2 bg-(--accent-primary) text-white font-bold text-sm hover:bg-(--accent-secondary) transition-colors"
                                    >
                                          + ADD ASSET
                                    </button>

                                    {/* Added Assets List */}
                                    {formData.assets.length > 0 && (
                                          <div className="mt-4 space-y-2">
                                                <div className="micro-text text-xs text-(--text-muted)">
                                                      ADDED ASSETS:
                                                </div>
                                                {formData.assets.map((asset, index) => {
                                                      const assetInfo = assets.find(a => a._id === asset.assetId);
                                                      return (
                                                            <div
                                                                  key={index}
                                                                  className="flex items-center justify-between bg-(--bg-elevated) p-2 text-sm"
                                                            >
                                                                  <span>
                                                                        {assetInfo?.name} - ${asset.salePrice} (
                                                                        {asset.stockLimit} units)
                                                                  </span>
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => removeAsset(index)}
                                                                        className="text-(--data-danger) hover:underline text-xs font-bold"
                                                                  >
                                                                        REMOVE
                                                                  </button>
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    )}
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
                                          className="flex-1 px-4 py-2 bg-(--data-danger) text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                          {submitting ? 'CREATING...' : 'CREATE FLASH SALE'}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
