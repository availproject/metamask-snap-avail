import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUIStore } from "@/slices/UISlice";

const LoadingModal = () => {
  const { loader } = useUIStore();

  return (
    <Dialog open={loader.isLoading}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-dashed border-gray-300 rounded-full animate-spin"></div>
          <p className="text-gray-700">{loader.loadingMessage || 'Please wait while we process your request.'}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
