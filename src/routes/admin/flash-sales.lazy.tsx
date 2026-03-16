import { useState } from 'react';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuthStore } from '../../stores';
import { AdminHeader, LoadingScreen, FlashSaleFilter, AdminFlashSaleCard, CreateFlashSaleModal } from '../../components';
import { SaleLogsModal } from '../../components/admin/SaleLogsModal';
import { useAdminFlashSales } from '../../hooks';
import type { CreateFlashSaleRequest, FlashSale } from '../../types';

export const Route = createLazyFileRoute('/admin/flash-sales')({
      component: AdminFlashSales
});

function AdminFlashSales() {
      const { user, isLoading: isAuthLoading } = useAuthStore();
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [viewLogsSale, setViewLogsSale] = useState<{ id: string; title: string } | null>(null);
      const {
            flashSales,
            loadingSales,
            statusFilter,
            handleActivate,
            setStatusFilter,
            handleDeactivate,
            handleCreateFlashSale
      } = useAdminFlashSales();

      // Redirect non-admin users
      if (!isAuthLoading && (!user || user.role !== 'ADMIN')) {
            return <Navigate to="/" />;
      }

      const onCreateSuccess = async (saleData: CreateFlashSaleRequest) => {
            const success = await handleCreateFlashSale(saleData);
            if (success) {
                  setShowCreateModal(false);
            }
            return success;
      };

      if (isAuthLoading) {
            return <LoadingScreen message="Synchronizing Temporal Sales" progress={45} />;
      }

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary)">
                  <AdminHeader title="Flash Sale Management" subtitle="Schedule & Control Flash Sales" />

                  {/* Main Content */}
                  <main className="container mx-auto px-6 py-8">
                        {/* Status Filter */}
                        <FlashSaleFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

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
                                    {flashSales.map((sale: FlashSale) => (
                                          <AdminFlashSaleCard
                                                key={sale._id}
                                                sale={sale}
                                                onActivate={handleActivate}
                                                onDeactivate={handleDeactivate}
                                                onViewLogs={(id: string, title: string) => setViewLogsSale({ id, title })}
                                          />
                                    ))}
                              </div>
                        )}
                  </main>

                  {/* Create Modal */}
                  {showCreateModal && (
                        <CreateFlashSaleModal onClose={() => setShowCreateModal(false)} onCreate={onCreateSuccess} />
                  )}

                  {/* Logs Modal */}
                  {viewLogsSale && (
                        <SaleLogsModal
                              saleId={viewLogsSale.id}
                              saleTitle={viewLogsSale.title}
                              onClose={() => setViewLogsSale(null)}
                        />
                  )}
            </div>
      );
}
