import type { Asset } from '../../types';

interface AssetTableProps {
      assets: Asset[];
      loadingAssets: boolean;
      onDelete: (asset: Asset) => void;
}

export function AssetTable({ assets, loadingAssets, onDelete }: AssetTableProps) {
      return (
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
                                                            onClick={() => onDelete(asset)}
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
      );
}
