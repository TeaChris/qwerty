import { useState } from 'react';

interface DeleteConfirmationModalProps {
      assetName: string;
      onClose: () => void;
      onConfirm: () => Promise<void>;
}

export function DeleteConfirmationModal({ assetName, onClose, onConfirm }: DeleteConfirmationModalProps) {
      const [deleting, setDeleting] = useState(false);

      const handleConfirm = async () => {
            setDeleting(true);
            await onConfirm();
            setDeleting(false);
      };

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                  <div className="glass border-2 border-(--data-danger) p-8 max-w-md w-full relative overflow-hidden text-(--text-primary)">
                        {/* Tech Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 bg-(--data-danger)" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-(--data-danger)" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-(--data-danger)" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-(--data-danger)" />

                        <div className="space-y-6 text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--data-danger)/10 text-(--data-danger) text-3xl mb-2 animate-pulse border-2 border-(--data-danger)/30">
                                    ⚠️
                              </div>

                              <div className="space-y-2">
                                    <h2 className="text-xl font-black uppercase tracking-tighter text-(--data-danger)">
                                          Confirm Deletion
                                    </h2>
                                    <p className="text-sm text-(--text-muted) leading-relaxed">
                                          Are you sure you want to permanently remove <span className="text-(--text-primary) font-bold">{assetName}</span>? This action cannot be undone.
                                    </p>
                              </div>

                              <div className="flex gap-4 pt-2">
                                    <button
                                          onClick={onClose}
                                          disabled={deleting}
                                          className="flex-1 px-4 py-2 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-colors font-bold text-xs uppercase tracking-widest disabled:opacity-50"
                                    >
                                          Abort
                                    </button>
                                    <button
                                          onClick={handleConfirm}
                                          disabled={deleting}
                                          className="flex-1 px-4 py-2 bg-(--data-danger) text-white font-bold hover:bg-black transition-colors text-xs uppercase tracking-widest shadow-lg shadow-(--data-danger)/20 disabled:opacity-50"
                                    >
                                          {deleting ? 'Terminating...' : 'Confirm'}
                                    </button>
                              </div>

                              <div className="micro-text text-[8px] text-(--text-muted) opacity-50">
                                    REF_ID: OBJ_REMOVAL_0XDE7A
                              </div>
                        </div>
                  </div>
            </div>
      );
}
