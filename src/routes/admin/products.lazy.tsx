import { useState, useEffect, useCallback } from 'react';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuthStore } from '../../stores';
import { useAdminAssets } from '../../hooks';
import type { CreateAssetRequest, Category, Asset } from '../../types';
import { getCategories } from '../../services';
import {
      LoadingScreen,
      AdminHeader,
      AssetTable,
      CreateAssetModal,
      DeleteConfirmationModal
} from '../../components';

export const Route = createLazyFileRoute('/admin/products')({
      component: AdminAssets
});

function AdminAssets() {
      const { user, isLoading: isAuthLoading } = useAuthStore();
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
      const [categories, setCategories] = useState<Category[]>([]);
      const {
            assets,
            loadingAssets,
            page,
            setPage,
            total,
            handleCreateAsset,
            handleDeleteAsset
      } = useAdminAssets();

      const fetchCategories = useCallback(async () => {
            const { data } = await getCategories();
            if (data) {
                  setCategories(data.data.categories);
            }
      }, []);

      useEffect(() => {
            if (user?.role === 'ADMIN') {
                  getCategories().then(({ data }) => {
                        if (data) {
                              setCategories(data.data.categories);
                        }
                  });
            }
      }, [user]);

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

      const handleConfirmDelete = async () => {
            if (!assetToDelete) return;
            const success = await handleDeleteAsset(assetToDelete._id);
            if (success) {
                  setAssetToDelete(null);
            }
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
                              <h2 className="text-xl font-black uppercase tracking-tighter">
                                    Database_Registry
                              </h2>
                              <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="px-6 py-2 bg-(--accent-primary) text-white font-black uppercase tracking-widest text-xs hover:bg-(--accent-secondary) transition-all shadow-lg shadow-(--accent-primary)/20"
                              >
                                    + ADD_NEW_ASSET
                              </button>
                        </div>

                        {/* Assets Table */}
                        <AssetTable
                              assets={assets}
                              loadingAssets={loadingAssets}
                              onDelete={setAssetToDelete}
                        />

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
                        <CreateAssetModal
                              onClose={() => setShowCreateModal(false)}
                              onCreate={onCreateSuccess}
                              categories={categories}
                              onCategoryCreated={fetchCategories}
                        />
                  )}

                  {/* Delete Confirmation Modal */}
                  {assetToDelete && (
                        <DeleteConfirmationModal
                              assetName={assetToDelete.name}
                              onClose={() => setAssetToDelete(null)}
                              onConfirm={handleConfirmDelete}
                        />
                  )}
            </div>
      );
}
