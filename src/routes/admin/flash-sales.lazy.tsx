import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import {
      getFlashSales,
      createFlashSale,
      activateFlashSale,
      deactivateFlashSale,
      getProducts,
      type FlashSale,
      type CreateFlashSaleRequest,
      type Product
} from '../../lib/admin.api';
import { toast } from 'sonner';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LoadingScreen } from '../../components';

export const Route = createLazyFileRoute('/admin/flash-sales')({
      component: AdminFlashSales
});

function AdminFlashSales() {
      const { user, isLoading } = useAuthStore();
      const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
      const [loadingSales, setLoadingSales] = useState(true);
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [statusFilter, setStatusFilter] = useState<string>('');

      // Fetch flash sales
      const fetchFlashSales = useCallback(
            async (isInitial = false) => {
                  if (!isInitial) {
                        setLoadingSales(true);
                  }
                  const { data, error } = await getFlashSales(1, 20, statusFilter);

                  if (error) {
                        toast.error('Failed to load flash sales');
                        console.error(error);
                  } else if (data) {
                        setFlashSales(data.data.flashSales);
                  }

                  setLoadingSales(false);
            },
            [statusFilter]
      );

      useEffect(() => {
            const initFetch = async () => {
                  if (user?.role === 'ADMIN') {
                        await fetchFlashSales(true);
                  }
            };

            initFetch();
      }, [user, fetchFlashSales]);

      // Redirect non-admin users
      if (!isLoading && (!user || user.role !== 'ADMIN')) {
            return <Navigate to="/" />;
      }

      const handleCreateFlashSale = async (saleData: CreateFlashSaleRequest) => {
            const { error } = await createFlashSale(saleData);

            if (error) {
                  toast.error(error.message || 'Failed to create flash sale');
                  return false;
            }

            toast.success('Flash sale created successfully!');
            setShowCreateModal(false);
            fetchFlashSales();
            return true;
      };

      const handleActivate = async (id: string) => {
            const { error } = await activateFlashSale(id);

            if (error) {
                  toast.error(error.message || 'Failed to activate flash sale');
                  return;
            }

            toast.success('Flash sale activated!');
            fetchFlashSales();
      };

      const handleDeactivate = async (id: string) => {
            if (!confirm('Are you sure you want to deactivate this flash sale?')) return;

            const { error } = await deactivateFlashSale(id);

            if (error) {
                  toast.error(error.message || 'Failed to deactivate flash sale');
                  return;
            }

            toast.success('Flash sale deactivated');
            fetchFlashSales();
      };

      if (isLoading) {
            return <LoadingScreen message="Synchronizing Temporal Sales" progress={45} />;
      }

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary)">
                  <AdminHeader title="Flash Sale Management" subtitle="Schedule & Control Flash Sales" />

                  {/* Main Content */}
                  <main className="container mx-auto px-6 py-8">
                        {/* Status Filter */}
                        <div className="glass border-2 border-(--border-default) p-4 mb-6">
                              <div className="flex gap-4">
                                    <button
                                          onClick={() => setStatusFilter('')}
                                          className={`px-4 py-2 font-bold text-sm ${
                                                statusFilter === ''
                                                      ? 'bg-(--accent-primary) text-white'
                                                      : 'bg-(--bg-elevated) border-2 border-(--border-default) text-(--text-secondary) hover:border-(--accent-primary)'
                                          } transition-colors`}
                                    >
                                          ALL
                                    </button>
                                    <button
                                          onClick={() => setStatusFilter('scheduled')}
                                          className={`px-4 py-2 font-bold text-sm ${
                                                statusFilter === 'scheduled'
                                                      ? 'bg-(--accent-primary) text-white'
                                                      : 'bg-(--bg-elevated) border-2 border-(--border-default) text-[var(--text-secondary) hover:border-(--accent-primary)'
                                          } transition-colors`}
                                    >
                                          SCHEDULED
                                    </button>
                                    <button
                                          onClick={() => setStatusFilter('active')}
                                          className={`px-4 py-2 font-bold text-sm ${
                                                statusFilter === 'active'
                                                      ? 'bg-(--accent-primary) text-white'
                                                      : 'bg-(--bg-elevated) border-2 border-(--border-default) text-(--text-secondary) hover:border-(--accent-primary)'
                                          } transition-colors`}
                                    >
                                          ACTIVE
                                    </button>
                                    <button
                                          onClick={() => setStatusFilter('ended')}
                                          className={`px-4 py-2 font-bold text-sm ${
                                                statusFilter === 'ended'
                                                      ? 'bg-(--accent-primary) text-white'
                                                      : 'bg-(--bg-elevated) border-2 border-(--border-default) text-(--text-secondary) hover:border-(--accent-primary)'
                                          } transition-colors`}
                                    >
                                          ENDED
                                    </button>
                              </div>
                        </div>

                        {/* Flash Sales Grid */}
                        {loadingSales ? (
                              <div className="glass border-2 border-(--border-default) p-12 text-center">
                                    <div className="text-(--text-muted)">Loading flash sales...</div>
                              </div>
                        ) : flashSales.length === 0 ? (
                              <div className="glass border-2 border-(--border-default) p-12 text-center">
                                    <div className="text-6xl mb-4">⚡</div>
                                    <h3 className="text-xl font-black mb-2">NO FLASH SALES YET</h3>
                                    <p className="text-(--text-muted) mb-6">
                                          Create your first flash sale to start generating excitement and sales!
                                    </p>
                                    <button
                                          onClick={() => setShowCreateModal(true)}
                                          className="px-6 py-3 bg-(--data-danger) text-white font-bold hover:opacity-90 transition-opacity"
                                    >
                                          CREATE FIRST FLASH SALE
                                    </button>
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 gap-6">
                                    {flashSales.map(sale => (
                                          <FlashSaleCard
                                                key={sale._id}
                                                sale={sale}
                                                onActivate={handleActivate}
                                                onDeactivate={handleDeactivate}
                                          />
                                    ))}
                              </div>
                        )}
                  </main>

                  {/* Create Modal */}
                  {showCreateModal && (
                        <CreateFlashSaleModal
                              onClose={() => setShowCreateModal(false)}
                              onCreate={handleCreateFlashSale}
                        />
                  )}
            </div>
      );
}

// Flash Sale Card Component
interface FlashSaleCardProps {
      sale: FlashSale;
      onActivate: (id: string) => void;
      onDeactivate: (id: string) => void;
}

function FlashSaleCard({ sale, onActivate, onDeactivate }: FlashSaleCardProps) {
      const statusColors = {
            scheduled: 'var(--data-warning)',
            active: 'var(--data-success)',
            ended: 'var(--text-muted)',
            cancelled: 'var(--data-danger)'
      };

      return (
            <div className="glass border-2 border-(--border-default) p-6 hover:border-(--accent-primary) transition-all">
                  <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                              <h3 className="text-lg font-black mb-1">{sale.title}</h3>
                              <p className="text-sm text-(--text-muted) mb-3">{sale.description}</p>
                              <div className="flex gap-4 text-xs text-(--text-secondary)">
                                    <span>
                                          ⏰ {new Date(sale.startTime).toLocaleString()} -{' '}
                                          {new Date(sale.endTime).toLocaleString()}
                                    </span>
                                    <span>📦 {sale.products.length} products</span>
                              </div>
                        </div>
                        <div className="flex items-center gap-3">
                              <span
                                    className="px-3 py-1 text-xs font-bold text-white uppercase"
                                    style={{ backgroundColor: statusColors[sale.status] }}
                              >
                                    {sale.status}
                              </span>
                              {sale.status === 'scheduled' && (
                                    <button
                                          onClick={() => onActivate(sale._id)}
                                          className="px-3 py-1 bg-(--data-success) text-white text-xs font-bold hover:opacity-90"
                                    >
                                          ACTIVATE
                                    </button>
                              )}
                              {sale.status === 'active' && (
                                    <button
                                          onClick={() => onDeactivate(sale._id)}
                                          className="px-3 py-1 bg-(--data-danger) text-white text-xs font-bold hover:opacity-90"
                                    >
                                          DEACTIVATE
                                    </button>
                              )}
                        </div>
                  </div>
            </div>
      );
}

// Create Flash Sale Modal Component
interface CreateFlashSaleModalProps {
      onClose: () => void;
      onCreate: (data: CreateFlashSaleRequest) => Promise<boolean>;
}

function CreateFlashSaleModal({ onClose, onCreate }: CreateFlashSaleModalProps) {
      const [products, setProducts] = useState<Product[]>([]);
      const [formData, setFormData] = useState<CreateFlashSaleRequest>({
            title: '',
            description: '',
            products: [],
            startTime: '',
            endTime: '',
            duration: 60
      });
      const [submitting, setSubmitting] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState('');
      const [salePrice, setSalePrice] = useState(0);
      const [stockLimit, setStockLimit] = useState(0);

      // Fetch products on mount
      useEffect(() => {
            const fetchProducts = async () => {
                  const { data } = await getProducts(1, 100);
                  if (data) {
                        setProducts(data.data.products);
                  }
            };
            fetchProducts();
      }, []);

      const addProduct = () => {
            if (!selectedProduct || salePrice <= 0 || stockLimit <= 0) {
                  toast.error('Please fill in all product details');
                  return;
            }

            setFormData({
                  ...formData,
                  products: [
                        ...formData.products,
                        {
                              productId: selectedProduct,
                              salePrice,
                              stockLimit
                        }
                  ]
            });

            setSelectedProduct('');
            setSalePrice(0);
            setStockLimit(0);
      };

      const removeProduct = (index: number) => {
            setFormData({
                  ...formData,
                  products: formData.products.filter((_, i) => i !== index)
            });
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (formData.products.length === 0) {
                  toast.error('Please add at least one product to the flash sale');
                  return;
            }

            setSubmitting(true);
            const success = await onCreate(formData);
            setSubmitting(false);

            if (success) {
                  setFormData({
                        title: '',
                        description: '',
                        products: [],
                        startTime: '',
                        endTime: '',
                        duration: 60
                  });
            }
      };

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="glass border-2 border-(--border-accent) p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-black mb-4">CREATE NEW FLASH SALE</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                    <label className="block micro-text text-xs text-(--text-muted) mb-2">TITLE *</label>
                                    <input
                                          type="text"
                                          required
                                          value={formData.title}
                                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                                          placeholder="Black Friday Mega Sale"
                                          className="w-full px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary) focus:border-r(--accent-primary) outline-none"
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

                              {/* Add Products Section */}
                              <div className="border-2 border-(--border-default) p-4">
                                    <h3 className="font-black mb-3">ADD PRODUCTS TO SALE</h3>

                                    <div className="grid grid-cols-4 gap-3 mb-3">
                                          <select
                                                value={selectedProduct}
                                                onChange={e => setSelectedProduct(e.target.value)}
                                                className="col-span-2 px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default)] text-(--text-primary) focus:border-(--accent-primary) outline-none"
                                          >
                                                <option value="">Select product...</option>
                                                {products.map(product => (
                                                      <option key={product._id} value={product._id}>
                                                            {product.name} (${product.price})
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
                                                className="px-4 py-2 bg-(--bg-surface) border-2 border-(--border-default) text-(--text-primary)] focus:border-(--accent-primary)] outline-none"
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
                                          onClick={addProduct}
                                          className="w-full px-4 py-2 bg-(--accent-primary) text-white font-bold text-sm hover:bg-(--accent-secondary) transition-colors"
                                    >
                                          + ADD PRODUCT
                                    </button>

                                    {/* Added Products List */}
                                    {formData.products.length > 0 && (
                                          <div className="mt-4 space-y-2">
                                                <div className="micro-text text-xs text-(--text-muted)">
                                                      ADDED PRODUCTS:
                                                </div>
                                                {formData.products.map((product, index) => {
                                                      const productInfo = products.find(
                                                            p => p._id === product.productId
                                                      );
                                                      return (
                                                            <div
                                                                  key={index}
                                                                  className="flex items-center justify-between bg-(--bg-elevated)] p-2 text-sm"
                                                            >
                                                                  <span>
                                                                        {productInfo?.name} - ${product.salePrice} (
                                                                        {product.stockLimit} units)
                                                                  </span>
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => removeProduct(index)}
                                                                        className="text-(--data-danger)] hover:underline text-xs font-bold"
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
