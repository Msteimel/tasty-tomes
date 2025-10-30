import { Button } from "@/app/components/ui/button";

interface DeleteConfirmModalProps {
  type: "recipe" | "variant";
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  type,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold mb-4">Confirm Removal</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this {type} from the cookbook? This
          action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
